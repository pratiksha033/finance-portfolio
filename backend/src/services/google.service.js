

exports.getFundamentals = async (symbol) => {
    try {
   
      const pe = (Math.random() * 40 + 5).toFixed(2);     
      const earnings = (Math.random() * 1000 + 50).toFixed(2); 
  
      return {
        pe,
        earnings
      };
  
    } catch (err) {
      return {
        pe: '-',
        earnings: '-'
      };
    }
  };
  