import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import kp from './keypair.json'
import idl from "../idl.json";

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

// Create a keypair for the account that will hold the GIF data.
const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)

// Get our program's id form the IDL file.
const programID = new PublicKey(idl.metadata.address);

// Set our network to devent.
const network = clusterApiUrl("devnet");
// Control's how we want to acknowledge when a trasnaction is "done".
const opts = {
  preflightCommitment: "processed",
};

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(
    connection,
    window.solana,
    opts.preflightCommitment
  );
  return provider;
};

export const createGifAccount = async (setGifList) => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    console.log("ping");
    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });
    console.log(
      "Created a new BaseAccount w/ address:",
      baseAccount.publicKey.toString()
    );
    await getGifList(setGifList);
  } catch (error) {
    console.log("Error creating BaseAccount account:", error);
  }
};

export const getGifList = async (setGifList) => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log("Got the account", account);
    setGifList(account.gifList);
  } catch (error) {
    console.log("Error in getGifs: ", error);
    setGifList(null);
  }
};

export const sendGif = async (setGifList, inputValue) => {
  if (inputValue.length === 0) {
    console.log("No gif link given!");
    return;
  }
  console.log("Gif link:", inputValue);
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    await program.rpc.addGif(inputValue, {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });
    console.log("GIF sucesfully sent to program", inputValue);
    await getGifList(setGifList);
  } catch (error) {
    console.log("Error sending GIF:", error);
  }
};
