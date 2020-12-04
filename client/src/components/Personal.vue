<template @confirmPersonal="confirm" @cancelPersonal="cancel">
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
            Miembro
          </div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.nombres" label="Nombres" />
          <q-input v-model="form.apellidos" label="Apellidos" />
          <q-input v-model="form.email" label="Email" />
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
  name: "Personal",
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
      this.$api.post("personal", this.form).then(res => {
        this.form = {};
        this.$emit("confirmPersonal");
      });
    },
    cancel() {
      this.form = {};
      this.$emit("cancelPersonal");
    }
  }
};
</script>
