<template>
  <q-page>
    <div class="row justify-center full-width fondo-radial">
      <div class="col-8">
        <div class="row justify-center">
          <img src="../assets/logo.png" style="width: 400px" />
        </div>
        <div class="row q-pa-md">
          <div class="q-pa-md text-h6 self-center">Fecha:</div>
          <div class="col-md-3">
            <q-input
              stack-label
              label="Fecha"
              v-model="form.fecha"
              type="date"
            ></q-input>
          </div>
          <div class="q-pa-md text-h6 self-center">Ciudad:</div>
          <div class="col-md-4">
            <q-select
              stack-label
              label="Ciudad"
              v-model="form.city_id"
              :options="cities"
              option-label="nombre"
              option-value="id"
              emit-value
              map-options
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay Resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-btn
                  round
                  color="primary"
                  icon="add"
                  @click="isActiveCity"
                ></q-btn>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="q-pa-md text-h6 self-center">Nombre:</div>
          <div class="col-md-9">
            <q-select
              stack-label
              label="Nombre"
              v-model="form.personal_id"
              :options="personals"
              option-label="full_name"
              option-value="id"
              emit-value
              map-options
              @input="getEmail"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay Resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-btn round color="primary" icon="add" @click="isPersonal = true"></q-btn> </template
            ></q-select>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="q-pa-md text-h6 self-center">Iglesia:</div>
          <div class="col-md-9">
            <q-select
              stack-label
              label="Iglesia"
              v-model="form.temple_id"
              :options="churchs"
              option-label="nombre"
              option-value="id"
              emit-value
              map-options
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay Resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-btn round color="primary" icon="add"></q-btn>
              </template>
            </q-select>
          </div>
        </div>
        <div class="row q-pa-md" readonly>
          <div class="q-pa-md text-h6 self-center">Email:</div>
          <div class="col-md-10">
            <q-input readonly stack-label label="Email" v-model="form.email"></q-input>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col" style="max-width: 215px">
            <div class="q-px-md text-h6 self-center">Diezmos:</div>
            <div class="q-px-md text-subtitle1 self-center">
              (Decima parte del Señor)
            </div>
          </div>
          <div class="col self-end text-right" style="max-width: 90px">
            <div class="q-pr-md text-caption self-center">Tipo de Moneda:</div>
          </div>
          <div class="col-3 q-pr-md">
            <q-select
              stack-label
              label="Tipo de Moneda"
              v-model="form.ten.money_type_id"
              :options="moneis"
              option-label="nombre"
              option-value="id"
              emit-value
              map-options
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay Resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-btn round color="primary" icon="add" @click="isMoney = true"></q-btn>
              </template>
            </q-select>
          </div>
          <div class="col-2">
            <q-input stack-label label="Diezmo" v-model="form.ten.monto" @input="sum"></q-input>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="col" style="max-width: 215px">
            <div class="q-px-md text-h6 self-center">Mi Ofrenda</div>
            <div class="q-px-md text-h6 self-center">
              De Pacto de Amor
            </div>
          </div>
          <div class="col self-end text-right" style="max-width: 90px">
            <div class="q-pr-md text-caption self-center">Tipo de Moneda:</div>
          </div>
          <div class="col-3 q-pr-md">
            <q-select
              stack-label
              label="Tipo de Moneda"
              v-model="form.offering.money_type_id"
              :options="moneis"
              option-label="nombre"
              option-value="id"
              emit-value
              map-options
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay Resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-btn round color="primary" icon="add" @click="isMoney = true"></q-btn>
              </template>
            </q-select>
          </div>
          <div class="col-2">
            <q-input stack-label label="Ofrenda" v-model="form.offering.monto" @input="sum"></q-input>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="q-px-md q-ml-md text-h6 ">
            Mi Ofrenda de Colaboracion:
          </div>
          <q-btn round color="primary" icon="add" @click="addOffering"></q-btn>
        </div>
        <q-list class="q-pa-md" v-if="form.allOfferings.length > 0">
          <q-scroll-area style="height: 250px">
            <q-item
              v-for="(offering, index) in form.allOfferings"
              :key="index"
              class="row q-pa-md"
            >
              <div class="col" style="max-width: 215px">
                <q-select
                  v-model="offering.concept_id"
                  :options="concepts"
                  option-label="nombre"
                  option-value="id"
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay Resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:after>
                    <q-btn round color="primary" icon="add" @click="isConcept = true"></q-btn>
                  </template>
                </q-select>
              </div>
              <div class="col self-end text-right" style="max-width: 90px">
                <div class="q-pr-md text-caption self-center">
                  Tipo de Moneda:
                </div>
              </div>
              <div class="col-3 q-pr-md">
                <q-select
                  stack-label
                  label="Tipo de Moneda"
                  v-model="offering.money_type_id"
                  :options="moneis"
                  option-label="nombre"
                  option-value="id"
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay Resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:after>
                    <q-btn round color="primary" icon="add" @click="isMoney = true"></q-btn>
                  </template>
                </q-select>
              </div>
              <div class="col-2">
                <q-input
                  stack-label
                  label="Monto"
                  v-model="offering.monto"
                  @input="sum"
                ></q-input>
              </div>
              <div>
                <q-btn
                  round
                  color="negative"
                  icon="close"
                  title="Eliminar Ofrenda"
                  @click="deleteOffering(index)"
                />
              </div>
            </q-item>
          </q-scroll-area>
        </q-list>
        <div class="row q-pa-md text-right">
          <div class="col self-end text-right">
            <div class="q-pr-md text-h6 self-center">Total Incluido:</div>
          </div>
          <q-input readonly stack-label label="Diezmo" v-model="form.total"></q-input>
        </div>
        <div class="row q-pa-md">
          <div class="q-px-md q-ml-md text-h6 ">
            Transferencias:
          </div>
          <q-btn round color="primary" icon="add" @click="addTransfer"></q-btn>
        </div>
        <q-list class="q-pa-md" v-if="form.allTransfer.length > 0">
          <q-scroll-area style="height: 250px">
            <q-item
              v-for="(transfer, index) in form.allTransfer"
              :key="index"
              class="row q-pa-md"
            >
              <div class="col-3 q-pr-md">
                <q-input
                  stack-label
                  label="Fecha de Transferencia"
                  v-model="transfer.fecha"
                  type="date"
                ></q-input>
              </div>
              <div class="col-2 q-pr-md">
                <q-input
                  stack-label
                  label="Numero de Transferencia"
                  v-model="transfer.n_transferencia"
                ></q-input>
              </div>
              <div class="col-3 q-pr-md">
                <q-select
                  stack-label
                  label="Banco Receptor/Cuenta"
                  v-model="transfer.bank_id"
                  :options="banks"
                  option-label="nombre"
                  option-value="id"
                  emit-value
                  map-options
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay Resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:after>
                    <q-btn
                      round
                      color="primary"
                      icon="add"
                      @click="isActiveBank"
                    ></q-btn>
                  </template>
                </q-select>
              </div>
              <div class="col-3 q-pr-md">
                <q-input
                  stack-label
                  label="Monto Transferencia"
                  v-model="transfer.monto"
                ></q-input>
              </div>
              <div>
                <q-btn
                  round
                  color="negative"
                  icon="close"
                  title="Eliminar Ofrenda"
                  @click="deleteTransfer(index)"
                />
              </div>
            </q-item>
          </q-scroll-area>
        </q-list>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="done" color="accent" @click="register">Registrar</q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-fab
        v-model="fabLeft"
        vertical-actions-align="left"
        color="primary"
        glossy
        icon="add"
        label="Opciones"
        direction="up"
      >
        <q-fab-action
          label-position="right"
          color="primary"
          @click="isActiveChurch"
          icon="home_work"
          label="Iglesias"
        />
        <q-fab-action
          label-position="right"
          color="secondary"
          @click="isActiveBank"
          icon="account_balance"
          label="Banco"
        />
        <q-fab-action
          label-position="right"
          color="orange"
          @click="isMoney = true"
          icon="monetization_on"
          label="Tipo de Moneda"
        />
        <q-fab-action
          label-position="right"
          color="accent"
          @click="isConcept = true"
          icon="article"
          label="Concepto de Diezmo-Ofrenda"
        />
        <q-fab-action
          label-position="right"
          color="accent"
          @click="isReport = true"
          icon="print"
          label="Reporte"
        />
      </q-fab>
    </q-page-sticky>
    <church-component
      :isActive="isChurch"
      @confirm="confirmChurch"
      @cancel="cancelChurch"
    ></church-component>
    <city-component
      :isActive="isCity"
      @confirmCity="confirmCity"
      @cancelCity="cancelCity"
    ></city-component>
    <bank-component
      :isActive="isBank"
      @confirmBank="confirmBank"
      @cancelBank="cancelBank"
    ></bank-component>
    <concept-component
      :isActive="isConcept"
      @confirmConcept="confirmConcept"
      @cancelConcept="cancelConcept"
    ></concept-component>
    <money-component
      :isActive="isMoney"
      @confirmMoney="confirmMoney"
      @cancelMoney="cancelMoney"
    ></money-component>
    <personal-component
      :isActive="isPersonal"
      @confirmPersonal="confirmPersonal"
      @cancelPersonal="cancelPersonal"
    ></personal-component>
    <report-component
      :isActive="isReport"
      @confirmReport="confirmReport"
      @cancelReport="cancelReport"
    ></report-component>
  </q-page>
</template>

<script>
import CityComponent from "components/City";
import ChurchComponent from "components/Church";
import BankComponent from "components/Bank";
import ConceptComponent from "components/Concepts";
import MoneyComponent from "components/Money";
import PersonalComponent from "components/Personal";
import ReportComponent from "components/Report";
export default {
  name: "PageIndex",
  components: { ChurchComponent, CityComponent, BankComponent, ConceptComponent, PersonalComponent, MoneyComponent, ReportComponent },
  data: function() {
    return {
      fabLeft: false,
      isChurch: false,
      isCity: false,
      isBank: false,
      isConcept: false,
      isMoney: false,
      isPersonal: false,
      isReport: false,
      form: {
        ten: {
          monto: 0
        },
        offering: {
          monto: 0
        },
        allOfferings: [],
        allTransfer: [],
        total: 0
      },
      personals: [],
      moneis: [],
      transfers: [],
      concepts: [],
      cities: [],
      banks: [],
      churchs: []
    };
  },
  mounted() {
    this.getCities();
    this.getBanks();
    this.getChurchs();
    this.getConcepts();
    this.getPersonals();
    this.getMoneis();
  },
  methods: {
    sum () {
      console.log(this.form.allOfferings.length);
      this.form.total = 0
      this.form.total = Number(this.form.offering.monto) + Number(this.form.ten.monto)
      if (this.form.allOfferings.length) {
        for (let i of this.form.allOfferings) {
          console.log(i);
          this.form.total += Number(i.monto)
        }
      }
    },
    register () {
      this.$api.post("envelop", this.form).then(res => {
        // this.concepts = res;
      });
    },
    getConcepts() {
      this.$api.get("concept").then(res => {
        this.concepts = res;
      });
    },
    getBanks() {
      this.$api.get("bank").then(res => {
        this.banks = res;
      });
    },
    getCities() {
      this.$api.get("city").then(res => {
        this.cities = res;
      });
    },
    getChurchs() {
      this.$api.get("church").then(res => {
        this.churchs = res
      });
    },
    getPersonals() {
      this.$api.get("personal").then(res => {
        this.personals = res
      });
    },
    getMoneis() {
      this.$api.get("money").then(res => {
        this.moneis = res
      });
    },
    addOffering() {
      this.form.allOfferings.push({});
    },
    deleteOffering(index) {
      this.form.allOfferings.splice(index, 1);
    },
    addTransfer() {
      this.form.allTransfer.push({});
    },
    deleteTransfer(index) {
      this.form.allTransfer.splice(index, 1);
    },
    isActiveChurch() {
      this.isChurch = true;
    },
    confirmChurch() {
      this.getChurchs();
      this.getCities();
      this.isChurch = false;
    },
    cancelChurch() {
      this.getCities();
      this.isChurch = false;
    },
    isActiveCity() {
      this.isCity = true;
    },
    confirmCity() {
      this.getCities();
      this.getChurchs();
      this.isCity = false;
    },
    cancelCity() {
      this.isCity = false;
    },
    isActiveReport() {},
    isActiveConcept() {},
    isActiveMoney() {},
    isActiveBank() {
      this.isBank = true;
    },
    confirmBank() {
      this.getBanks();
      this.isBank = false;
    },
    cancelBank() {
      this.isBank = false;
    },
    confirmConcept () {
      this.getConcepts();
      this.isConcept = false
    },
    cancelConcept () {
      this.isConcept = false
    },
    confirmPersonal () {
      this.getPersonals();
      this.isPersonal = false
    },
    cancelPersonal () {
      this.isPersonal = false
    },
    confirmMoney () {
      this.getMoneis();
      this.isMoney = false
    },
    cancelMoney () {
      this.isMoney = false
    },
    confirmReport () {
      this.isReport = false
    },
    cancelReport () {
      this.isReport = false
    },
    getEmail (val) {
      this.form.email = this.personals.find(ele => ele.id === val).email
    }
  }
};
</script>
<style>
.fondo-radial {
  background-color: #f39f86;
  background-image: linear-gradient(315deg, #f39f86 0%, #f9d976 74%);
}
</style>
