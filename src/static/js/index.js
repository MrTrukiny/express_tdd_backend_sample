/* eslint-disable no-alert */
/* eslint-disable no-negated-condition */
/* eslint-disable no-prototype-builtins */
const mercadoPagoPublicKey = document.getElementById('mercado-pago-public-key').value;
const mercadopago = new MercadoPago(mercadoPagoPublicKey);

function loadCardForm() {
  const productCost = document.getElementById('amount').value;
  const productDescription = document.getElementById('product-description').innerText;

  const cardForm = mercadopago.cardForm({
    amount: productCost,
    autoMount: true,
    form: {
      id: 'form-checkout',
      cardholderName: {
        id: 'form-checkout__cardholderName',
        placeholder: 'Holder name',
      },
      cardholderEmail: {
        id: 'form-checkout__cardholderEmail',
        placeholder: 'E-mail',
      },
      cardNumber: {
        id: 'form-checkout__cardNumber',
        placeholder: 'Card number',
      },
      cardExpirationMonth: {
        id: 'form-checkout__cardExpirationMonth',
        placeholder: 'MM',
      },
      cardExpirationYear: {
        id: 'form-checkout__cardExpirationYear',
        placeholder: 'YY',
      },
      securityCode: {
        id: 'form-checkout__securityCode',
        placeholder: 'Security code',
      },
      installments: {
        id: 'form-checkout__installments',
        placeholder: 'Total installments',
      },
      identificationType: {
        id: 'form-checkout__identificationType',
      },
      identificationNumber: {
        id: 'form-checkout__identificationNumber',
        placeholder: 'Identification number',
      },
      issuer: {
        id: 'form-checkout__issuer',
        placeholder: 'Issuer',
      },
    },
    callbacks: {
      onFormMounted(error) {
        if (error) return console.warn('Form Mounted handling error: ', error);
      },
      onSubmit(event) {
        event.preventDefault();
        document.getElementById('loading-message').style.display = 'block';

        const {
          paymentMethodId,
          issuerId,
          cardholderEmail: email,
          amount,
          installments,
          token,
          identificationNumber,
          identificationType,
        } = cardForm.getCardFormData();

        fetch('/api/v1.0/shops/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            issuerId,
            paymentMethodId,
            transactionAmount: Number(amount),
            installments: Number(installments),
            description: productDescription,
            payer: {
              email,
              identification: {
                docType: identificationType,
                docNumber: identificationNumber,
              },
            },
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((result) => {
            if (!result.hasOwnProperty('error')) {
              const { statusDetail, status, id } = result.data.paymentInfo;
              document.getElementById('success-response').style.display = 'block';
              document.getElementById('payment-id').innerText = id;
              document.getElementById('payment-status').innerText = status;
              document.getElementById('payment-detail').innerText = statusDetail;
            } else {
              document.getElementById('error-message').textContent = result.error;
              document.getElementById('fail-response').style.display = 'block';
            }

            $('.container__payment').fadeOut(500);
            setTimeout(() => {
              $('.container__result').show(500).fadeIn();
            }, 500);
          })
          .catch((error) => {
            alert('Unexpected error\n' + JSON.stringify(error.message));
          });
      },
      onFetching(resource) {
        const payButton = document.getElementById('form-checkout__submit');
        payButton.setAttribute('disabled', true);
        return () => {
          payButton.removeAttribute('disabled');
        };
      },
    },
  });
}

// Handle transitions
document.getElementById('checkout-btn').addEventListener('click', function () {
  $('.container__cart').fadeOut(500);
  setTimeout(() => {
    loadCardForm();
    $('.container__payment').show(500).fadeIn();
  }, 500);
});

document.getElementById('go-back').addEventListener('click', function () {
  $('.container__payment').fadeOut(500);
  setTimeout(() => {
    $('.container__cart').show(500).fadeIn();
  }, 500);
});

// Handle price update
function updatePrice() {
  const quantity = document.getElementById('quantity').value;
  const unitPrice = document.getElementById('unit-price').innerText;
  const amount = parseInt(unitPrice) * parseInt(quantity);

  document.getElementById('cart-total').innerText = '$ ' + amount;
  document.getElementById('summary-price').innerText = '$ ' + unitPrice;
  document.getElementById('summary-quantity').innerText = quantity;
  document.getElementById('summary-total').innerText = '$ ' + amount;
  document.getElementById('amount').value = amount;
}

document.getElementById('quantity').addEventListener('change', updatePrice);
updatePrice();
