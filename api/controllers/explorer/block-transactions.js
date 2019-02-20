module.exports = {

  friendlyName: 'Block transactions',

  description: 'Blockchain explorer block transactions',

  inputs: {
    id: {
      type: 'number'
    }
  },

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'explorer/block-transactions'
    },
    notFound: {
      responseType: 'view',
      viewTemplatePath: '404'
    },
  },


  fn: async function (inputs, exits) {
    let transactions;
    
    transactions = await Transaction.find({ 
      select: ['id', 'block', 'timestamp', 'imputsArgs'],
      where: { block: 1 } 
    });

    if (transactions.length == 0) throw 'notFound';

    return exits.success({
      transactions: transactions,
      blockId: inputs.id
    });

  }

};