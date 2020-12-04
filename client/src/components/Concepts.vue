<template @confirmConcept="confirm" @cancelConcept="cancel">
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
            Concepto de Diezmo-Ofrenda
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
  name: "Concept",
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
      this.$api.post("concept", this.form).then(res => {
        this.form = {};
        this.$emit("confirmConcept");
      });
    },
    cancel() {
      this.form = {};
      this.$emit("cancelConcept");
    }
  }
};
</script>
