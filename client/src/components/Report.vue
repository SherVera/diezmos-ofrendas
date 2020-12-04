<template @confirmReport="confirm" @cancel="cancel">
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
            Reporte
          </div>
        </q-card-section>

        <q-card-section>
          <q-select
            stack-label
            label="Tipo"
            v-model="form.id"
            :options="[{ label: 'Semanal', value: 1}, { label: 'Mensual', value: 2}]"
            option-label="label"
            option-value="value"
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
          </q-select>
          <q-input
              stack-label
              label="Fecha"
              v-model="form.fecha"
              type="date"
            ></q-input>
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
    </q-dialog>
  </div>
</template>

<script>
import { openURL } from 'quasar'
import env from '.././env'

export default {
  name: "Report",
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: false,
      form: {}
    };
  },
  watch: {
    isActive: function(newVal, oldVal) {
      this.active = newVal;
    }
  },
  methods: {
    async confirm () {
      await this.$api.post(`report`, this.form).then(async res => {
        if (res) {
          await openURL(env.apiUrl + 'file/' + res)
          this.$emit("confirmReport");
        }
      });
    },
    cancel() {
      this.form = {};
      this.$emit("cancel");
    },
  }
};
</script>
