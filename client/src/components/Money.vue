<template @confirmMoney="confirm" @cancelMoney="cancel">
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
            Tipo de Moneda
          </div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.nombre" label="Nombre" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            @click.prevent="cancel"
          />

          <q-btn
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
export default {
  name: "Money",
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
    confirm() {
      console.log(this.form);
      this.$api.post("money", this.form).then(res => {
        this.form = {};
        this.$emit("confirmMoney");
      });
    },
    cancel() {
      this.form = {};
      this.$emit("cancelMoney");
    }
  }
};
</script>
