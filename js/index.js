const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const DonAidContractAddress = "0xeF0deB25FF3BDa90a06DD7E8bcbFc32B84D84148";
  const DonAidContractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "charities",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "ngo_address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "subject",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "fund_required",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fund_delivered",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "donateTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getRequirements",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "ngoadd",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "sub",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "fundreq",
				"type": "uint256"
			}
		],
		"name": "set_Requirement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
  let DonAidContract;
  const signer = provider.getSigner()

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      DonAidContract = new ethers.Contract(
        DonAidContractAddress,
        DonAidContractABI,
        signer
      );
    });
  });

  async function getRequirement() {
    const getRequirements = DonAidContract.getRequirements(1);
    const Donate = await getRequirements;
    console.log(Donate);
  }

  async function set_Requirement() {
    const charityAddress = document.getElementById("charityAdd").value;
    const subject = document.getElementById("sub").value;
    const description = document.getElementById("desc").value;
    const fundRequest = document.getElementById("fundReq").value;
    const setRequirements = DonAidContract.set_Requirement(charityAddress, subject, description, fundRequest);
    await setRequirements;
  }
  
  async function donate() {
    const charityId = document.getElementById("charityId").value;

  }