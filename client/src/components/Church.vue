<template @confirm="confirm" @cancel="cancel">
  <div>
    <q-dialog
      v-model="active"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-bar class="bg-primary text-white">
          <q-btn v-close-popup dense flat icon="close" @click.prevent="cancel">
            <q-tooltip>Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6 row justify-center">
            Iglesia
          </div>
        </q-card-section>

        <q-card-section>
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
          <q-input v-model="form.nombre" label="Nombre" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancelar"
            color="primary"
            @click.prevent="cancel"
          />

          <q-btn
            v-close-popup
            flat
            label="Registrar"
            color="primary"
            @click.prevent="confirm"
          />
        </q-card-actions>
      </q-card>
      <city-component
        :isActive="isCity"
        @confirmCity="confirmCity"
        @cancelCity="cancelCity"
      ></city-component>
    </q-dialog>
  </div>
</template>

<script>
import CityComponent from "./City";

export default {
  components: { CityComponent },
  name: "Church",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCity: false,
      active: false,
      form: {},
      cities: []
    };
  },
  watch: {
    isActive: function(newVal, oldVal) {
      this.active = newVal;
    }
  },
  created() {
    this.getCities();
  },
  methods: {
    async getCities() {
      await this.$api.get("city").then(res => {
        this.cities = res;
      });
    },
    confirm() {
      this.$api.post("church", this.form).then(res => {
        this.form = {};
        this.$emit("confirm");
      });
    },
    cancel() {
      this.form = {};
      this.$emit("cancel");
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
    }
  }
};
</script>
