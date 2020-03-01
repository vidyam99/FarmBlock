pragma solidity ^0.4.25;

 
contract Farmblock {

    enum Stages {
        ProposalAccepted,
        ProductWithTransport,
        ProductDelivered,
        ProductAccepted,
        Rejected
    }

    Stages public stage = Stages.ProposalAccepted;
    string status = "nothing";
    uint public creationTime = now;
    uint public amount ;
    uint public transAmount ;
    uint public paid;

    constructor(uint _amount , uint _transAmount , uint _paid) public {
        amount = _amount;
        transAmount = _transAmount;
        paid = _paid;
        status = "Proposal Accepted by the  Farmer .";
    }

    function getStatus() public view 
        returns (string){
            return status;
        }


    function getAmount() public view 
        returns (uint){
            return amount;
        }
    

    function getPaid() public view 
        returns (uint){
            return paid;
        }
    

    function getTrans() public view 
        returns (uint){
            return transAmount;
        }
    

    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }

    modifier timedTransitions() {
        if (stage == Stages.ProductWithTransport &&
                    now >= creationTime + 10 days){
            stage = Stages.Rejected;
            rejectTransaction();
        }

        _;
    }

    function ProductWithtransport(uint _transAmount) public {
        transAmount = _transAmount;
        nextStage();
    }

    function rejectTransaction() internal{
        status = " transaction rejected will be roklledback soon ...";
        amount = 0;
    }


    function DeliveredProduct()
        public
        {
            amount = amount - transAmount;
            decrementTransportAmount(transAmount);
            status = "product Delivery Reached the  customer ";
            nextStage();
        }

    

    function decrementTransportAmount(uint trans)
        internal
        {
            amount = amount - trans;
        }

    function payFarmer()
        public
        payable
        {
            paid = amount;
            amount = 0;
            status = "Farmer recieved the transactions";
        }

}