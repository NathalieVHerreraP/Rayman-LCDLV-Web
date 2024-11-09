import React from 'react';

const PurchaseConfirmation = ({ success }) => {
  return (
    <div className="purchase-confirmation">
      {success ? (
        <h2>¡Gracias por tu compra!</h2>
      ) : (
        <h2>La compra no fue exitosa. Inténtalo de nuevo.</h2>
      )}
    </div>
  );
};

export default PurchaseConfirmation;