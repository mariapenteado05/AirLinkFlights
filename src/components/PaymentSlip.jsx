// src/components/CompensationSlip.jsx
export const CompensationSlip = ({ reservationNumber, totalPrice, passengerName }) => {
  const slipWindow = window.open("", "_blank");

  slipWindow.document.write(`
    <html>
      <head>
        <title>Ficha de Compensação</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { color: #605DEC; }
          p { font-size: 16px; margin: 5px 0; }
          hr { margin: 20px 0; }
        </style>
      </head>
      <body>
        <h2>Ficha de Compensação - AirLink</h2>
        <p><strong>Valor:</strong> R$ ${totalPrice.toFixed(2)}</p>
        <p><strong>Nome do passageiro:</strong> ${passengerName}</p>
        <p><strong>Número da reserva:</strong> ${reservationNumber}</p>
        <p><strong>Banco conveniado:</strong> Banco AirLink 123</p>
        <p><strong>Vencimento:</strong> ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
        <hr/>
        <p>Apresente esta ficha em um banco conveniado para efetuar o pagamento.</p>
      </body>
    </html>
  `);

  slipWindow.print();
};
