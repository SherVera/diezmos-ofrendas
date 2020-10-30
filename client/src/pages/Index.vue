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
              v-model="form.date"
              type="date"
            ></q-input>
          </div>
          <div class="q-pa-md text-h6 self-center">Ciudad:</div>
          <div class="col-md-4">
            <q-select
              stack-label
              label="Ciudad"
              v-model="form.id_ciudad"
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
              v-model="form.offering"
              :options="offerings"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay Resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:after>
                <q-btn round color="primary" icon="add"></q-btn> </template
            ></q-select>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="q-pa-md text-h6 self-center">Iglesia:</div>
          <div class="col-md-9">
            <q-select
              stack-label
              label="Iglesia"
              v-model="form.offering"
              :options="offerings"
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
        <div class="row q-pa-md" disabled>
          <div class="q-pa-md text-h6 self-center">Email:</div>
          <div class="col-md-10">
            <q-input stack-label label="Email" v-model="form.city"></q-input>
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
              v-model="form.offering"
              :options="offerings"
            >
              <template v-slot:no-option>
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
          <div class="col-2">
            <q-input stack-label label="Diezmo" v-model="form.city"></q-input>
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
              v-model="form.offering"
              :options="offerings"
            >
              <template v-slot:no-option>
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
          <div class="col-2">
            <q-input stack-label label="Diezmo" v-model="form.city"></q-input>
          </div>
        </div>
        <div class="row q-pa-md">
          <div class="q-px-md q-ml-md text-h6 ">
            Mi Ofrenda de Colaboracion:
          </div>
          <q-btn round color="primary" icon="add" @click="addOffering"></q-btn>
        </div>
        <q-list class="q-pa-md" v-if="allOfferings.length > 0">
          <q-scroll-area style="height: 250px">
            <q-item
              v-for="(offering, index) in allOfferings"
              :key="index"
              class="row q-pa-md"
            >
              <div class="col" style="max-width: 215px">
                <q-select v-model="offering.offering" :options="offerings">
                  <template v-slot:no-option>
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
              <div class="col self-end text-right" style="max-width: 90px">
                <div class="q-pr-md text-caption self-center">
                  Tipo de Moneda:
                </div>
              </div>
              <div class="col-3 q-pr-md">
                <q-select
                  stack-label
                  label="Tipo de Moneda"
                  v-model="offering.money"
                  :options="offerings"
                >
                  <template v-slot:no-option>
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
              <div class="col-2">
                <q-input
                  stack-label
                  label="Diezmo"
                  v-model="offering.amount"
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
          <q-input stack-label label="Diezmo" v-model="form.city"></q-input>
        </div>
        <div class="row q-pa-md">
          <div class="q-px-md q-ml-md text-h6 ">
            Transferencias:
          </div>
          <q-btn round color="primary" icon="add" @click="addTransfer"></q-btn>
        </div>
        <q-list class="q-pa-md" v-if="allTransfer.length > 0">
          <q-scroll-area style="height: 250px">
            <q-item
              v-for="(transfer, index) in allTransfer"
              :key="index"
              class="row q-pa-md"
            >
              <div class="col-3 q-pr-md">
                <q-input
                  stack-label
                  label="Fecha de Transferencia"
                  v-model="transfer.date"
                  type="date"
                ></q-input>
              </div>
              <div class="col-2 q-pr-md">
                <q-input
                  stack-label
                  label="Numero de Transferencia"
                  v-model="transfer.number"
                ></q-input>
              </div>
              <div class="col-3 q-pr-md">
                <q-select
                  stack-label
                  label="Banco Receptor/Cuenta"
                  v-model="form.id_banco"
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
                  v-model="transfer.amount"
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
      <q-btn fab icon="done" color="accent">Registrar</q-btn>
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
          @click="isActiveMoney"
          icon="monetization_on"
          label="Tipo de Moneda"
        />
        <q-fab-action
          label-position="right"
          color="accent"
          @click="isActiveConcept"
          icon="article"
          label="Concepto de Diezmo-Ofrenda"
        />
        <q-fab-action
          label-position="right"
          color="accent"
          @click="isActiveReport"
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
  </q-page>
</template>

<script>
import CityComponent from "components/City";
import ChurchComponent from "components/Church";
import BankComponent from "components/Bank";
export default {
  name: "PageIndex",
  components: { ChurchComponent, CityComponent, BankComponent },
  data: function() {
    return {
      fabLeft: false,
      isChurch: false,
      isCity: false,
      isBank: false,
      form: {},
      allOfferings: [],
      offerings: [],
      allTransfer: [],
      transfers: [],
      cities: [],
      banks: []
    };
  },
  mounted() {
    this.getCities();
    this.getBanks();
    this.getChurchs();
  },
  methods: {
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
      this.$api.get("church").then(res => {});
    },
    addOffering() {
      this.allOfferings.push({});
    },
    deleteOffering(index) {
      this.allOfferings.splice(index, 1);
    },
    addTransfer() {
      this.allTransfer.push({});
    },
    deleteTransfer(index) {
      this.allTransfer.splice(index, 1);
    },
    isActiveChurch() {
      console.log(1);
      this.isChurch = true;
    },
    confirmChurch() {
      this.isChurch = false;
    },
    cancelChurch() {
      this.isChurch = false;
    },
    isActiveCity() {
      this.isCity = true;
    },
    confirmCity() {
      this.getCities();
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
