const axios = require("axios");
const {
  PAYPAL_API,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} = require("../config/config.js");

const createOrder = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "300.00",
          },
          description: "bus ticket sales application",
        },
      ],
      application_context: {
        brand_name: "ticketExpress.com",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: "http://localhost:3001/payment/capture-order",
        cancel_url: "http://localhost:3001/payment/cancel-order",
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: 'Ab3fo1dJ3hyDSILpbaYvlRDLHO9bVZwV_0fg-Mv0BKGT8xcyd255nu_6IAC3KTx1ll9IIP--QjIJ2_pA',
          password: 'EI0uHYr_31_coCWAGIFpO6T4_zc86jM_EW_QlqafuxFFOJfi2CZaJqPslJ2e1Mf24XEpSZrkULpzwoJh',
        },
      }
    );
    const response = await axios.post(
      `${PAYPAL_API}v2/checkout/orders`,
      order,
      {
        // auth: {
        //   username: 'Ab3fo1dJ3hyDSILpbaYvlRDLHO9bVZwV_0fg-Mv0BKGT8xcyd255nu_6IAC3KTx1ll9IIP--QjIJ2_pA',
        //   password: 'EI0uHYr_31_coCWAGIFpO6T4_zc86jM_EW_QlqafuxFFOJfi2CZaJqPslJ2e1Mf24XEpSZrkULpzwoJh',
        // },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something goes wrong");
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;

  const response = await axios.post(
    `${PAYPAL_API}v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    }
  );

  console.log(response.data);

  return res.redirect("http://localhost:3000/");
};

const cancelOrder = (req, res) => {
  res.redirect("http://localhost:3000/");
};

module.exports = {
  createOrder,
  captureOrder,
  cancelOrder,
};
