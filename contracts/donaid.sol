// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "hardhat/console.sol";

contract DOnAid {

        uint donId = uint(0) ;

       struct donation {
        uint id;
        address payable ngo_address;
        string subject;
        string description;
        uint256 fund_required;
        uint256 fund_delivered;
        }

        mapping(uint256 => donation) public charities;


    function set_Requirement(address payable ngoadd,
        string memory sub ,
        string memory desc ,
        uint256 fundreq ) public {

        donId++;
        charities[donId] = donation(
            donId,
            payable(msg.sender),
            sub,
            desc,
            fundreq,
            0
        );
    }

    function donateTokens(uint id) public payable {
            require(msg.value > 0);

            donation memory _donateTok = charities[id];
            address payable _charity = _donateTok.ngo_address;
            _charity.transfer(msg.value);
            _donateTok.fund_delivered = _donateTok.fund_delivered + uint256(msg.value);
    }

    function getRequirements(uint id) public view returns(uint256) {
        return charities[id].fund_delivered;
    }
}