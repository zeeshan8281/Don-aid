let signer;
let provider;
let DonAidContract;
async function connectToMetaMask() {
  window.ethereum.enable();
  provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(provider);
  console.log("function is called");
  if (window.ethereum)
    var address = await ethereum.request({ method: "eth_requestAccounts" });
  console.log(address[0]);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  console.log(signer);
  const DonAidContractAddress = "0xb56941Ff88Fd33ff081A1270833302F9Bd2f7052";
  const DonAidContractABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "charities",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address payable",
          name: "ngo_address",
          type: "address",
        },
        {
          internalType: "string",
          name: "subject",
          type: "string",
        },
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "fund_required",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "fund_delivered",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "donateTokens",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
      ],
      name: "getRequirements",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "ngoadd",
          type: "address",
        },
        {
          internalType: "string",
          name: "sub",
          type: "string",
        },
        {
          internalType: "string",
          name: "desc",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "fundreq",
          type: "uint256",
        },
      ],
      name: "set_Requirement",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  console.log(
    await provider.getBalance("0x3871501819066e22032493d3fdffc540d71365f1")
  );
  provider.listAccounts().then((accounts) => {
    DonAidContract = new ethers.Contract(
      DonAidContractAddress,
      DonAidContractABI,
      signer
    );
  });
}
async function getRequirement() {
  const getRequirements = DonAidContract.getRequirements(1);
  const Donate = await getRequirements;
  console.log(Donate);
}

async function set_Requirement() {
  // const charityAddress = document.getElementById("charityAdd").value;
  // const subject = document.getElementById("sub").value;
  // const description = document.getElementById("desc").value;
  // const fundRequest = document.getElementById("fundReq").value;
  // const setRequirements = DonAidContract.set_Requirement(charityAddress, subject, description, fundRequest);
  const setRequirements = await DonAidContract.set_Requirement(
    "0x3871501819066e22032493d3fdffc540d71365f1",
    "Animal welfare",
    "Street dog",
    100000
  );
  console.log(setRequirements);
}

async function donate() {
  const charityId = document.getElementById("charityId").value;
}
