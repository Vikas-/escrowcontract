const anchor = require('@project-serum/anchor');
const { assert } = require('chai');
const { SystemProgram } = anchor.web3;

describe('escrowcontract', () => {
  /* Create and set a provider*/
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Escrowcontract;

  it('Creates a counter', async () => {
    // Generate a dummy keypair to test. Contains both private and public key.
    const baseAccount = anchor.web3.Keypair.generate();
    // Call the create function via RPC
    await program.rpc.create({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount], // Note that signer is sending both the private and public keypair.
    });

    // Fetch the account and check the value of the counter
    // You can fetch the details if you just have the public key
    // Note that this is not program.rpc but instead program.account
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log('Count 0: ', account.count.toString());
    assert.ok(account.count.toString() == 0);
    _baseAccount = baseAccount;
  });

  it('Increments the counter', async () => {
    const baseAccount = _baseAccount;

    // Note that we don't have to send a signer here. We need to send signer info only when we have Signer in the context.
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log('Count 1: ', account.count.toString());
    assert.ok(account.count.toString() == 1);
  });
});
