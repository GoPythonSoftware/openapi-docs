<template>
  <rapi-doc
    ref="rapidoc"
    show-header="false"
    spec-url="https://raw.githubusercontent.com/GoPythonSoftware/openapi-docs/uw/src/spec/openapi.yaml"
    theme="dark"
  >
    <img
      slot="nav-logo"
      src="https://prognosfactor.com/_nuxt/img/prognos_logo_alt.256627c.png"
    />
    <Modal v-if="showCredentialsModal">
      <ModalBody>
        <ModalHeader
          ><AlertBox v-if="errorMessage">{{
            errorMessage
          }}</AlertBox></ModalHeader
        >
        <div>
          <div class="heading">Client ID:</div>
          <div>
            <input
              v-model="clientId"
              type="text"
              placeholder="Client ID"
              class="groupNameInputField"
            />
          </div>
        </div>
        <div>
          <div class="heading">Client Secret:</div>
          <div>
            <input
              v-model="clientSecret"
              type="text"
              placeholder="Client Secret"
              class="groupNameInputField"
            />
          </div>
        </div>
        <div>
          <div class="heading">Auth URL:</div>
          <div>
            <input
              v-model="authUrl"
              type="text"
              placeholder="Auth URL"
              class="groupNameInputField"
            />
          </div>
        </div>
        <div class="fetchButton" @click="loadFromForm">
          Fetch Token
        </div></ModalBody
      ></Modal
    >
    <div
      slot="auth"
      @click="showCredentialsModal = true"
      class="showCredentialsModalButton"
    >
      Enter Credentials
    </div>
  </rapi-doc>
</template>

<script>
import "rapidoc";
import Modal from "./components/Modal.vue";
import ModalBody from "./components/ModalBody.vue";
import requests from "../src/mixins/requests";
import ModalHeader from "./components/ModalHeader.vue";
import AlertBox from "./components/AlertBox.vue";
//client id, client url, client secret key
export default {
  name: "App",
  components: {
    Modal,
    ModalBody,
    ModalHeader,
    AlertBox,
  },
  mixins: [requests],
  data() {
    return {
      clientId: null,
      clientSecret: null,
      authUrl: null,
      errorMessage: null,
      validResponse: false,
      showCredentialsModal: false,
    };
  },
  methods: {
    // hit API based on the manual input
    async loadFromForm() {
      var payload = "grant_type=client_credentials&scope=underwriting/uwrs";
      var url = this.authUrl;
      var auth = "Basic " + btoa(this.clientId + ":" + this.clientSecret);
      var headers = {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: auth,
      };
      var resp = await this.fetchToken(url, payload, headers);
      console.log("Resp: ", resp);
      resp.error
        ? (this.errorMessage = resp.error)
        : this.$nextTick(() => {
            this.$refs.rapidoc.setApiKey("authToken", resp.access_token);
            this.errorMessage = null;
            this.validResponse = true;
            this.showCredentialsModal = false;
          });
    },
    // fetch token against credentials
    async fetchToken(url, payload, headers) {
      var resp = await this.postRequest(url, payload, headers);
      return resp;
    },
  },
};
</script>

<style scoped>
.groupNameInputField {
  width: 29.4vw;
  border: 2px solid rgb(0, 0, 0);

  height: 2.5vw;
  font-size: 0.8vw;
  color: rgb(0, 4, 8);
}
.groupNameInputField::placeholder {
  color: rgb(11, 26, 43);
  font-size: 0.9vw;
  text-align: center;
  font-weight: bold;
}
.fetchButton {
  padding: 0.5vw;
  background-color: rgb(35, 99, 156);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  border: 2px solid rgb(35, 99, 156);
  border-radius: 0.5vw;
  margin-top: 1vw;
  cursor: pointer;
  font-size: 0.9vw;
}
.heading {
  font-weight: bold;
}
.showCredentialsModalButton {
  border: 1px solid #f76b39;
  background-color: rgb(42, 43, 44);
  width: 10vw;
  height: 2vw;
  color: rgb(163, 160, 160);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8vw;
  font-weight: bold;
  border-radius: 0.1vw;
  margin-top: 0.5vw;
  cursor: pointer;
}
</style>
<style>
body {
  margin: 0 !important;
}
</style>
