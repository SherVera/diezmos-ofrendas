<template>
  <div>
    <div class="row justify-center q-pt-md">
      <q-btn
        v-for="btn in buttons"
        :key="btn.label"
        :label="btn.label"
        :color="btn.color"
        :to="btn.url"
      />
    </div>
    <div class="q-pa-md">
      <q-table
        :title="title"
        :data="data"
        :columns="cols"
        :filter="filter"
        row-key="_id"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <q-td
          slot="body-cell-actions"
          slot-scope="props"
          :props="props"
          v-if="checkIfActions()"
        >
          <q-btn
            v-for="action in props.row.actions"
            :key="action.icon"
            :icon="action.icon"
            :to="action.url"
            @click="execute(action.action, props.row._id)"
            :color="action.color"
            flat
            dense
          />
        </q-td>
      </q-table>
      <q-dialog
        v-model="confirm"
        persistent
      >
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar
              icon="warning"
              color="negative"
              text-color="white"
            />
            <span class="q-ml-sm">Está seguro de eliminar?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancelar"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              label="Eliminar"
              color="primary"
              @click="confirmDelete"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Listable',
  props: ['title', 'cols', 'buttons', 'apisource'],
  data () {
    return {
      filter: '',
      confirm: false,
      id: '',
      data: [],
      count: []
    }
  },
  created () {
    this.getRecords()
  },
  methods: {
    checkIfActions () {
      return this.cols.find((element) => element.name === 'actions')
    },
    delete (id) {
      this.confirm = true
      this.id = id
    },
    execute (name, id) {
      if (typeof this[name] === 'function') {
        this[name](id)
      }
    },
    confirmDelete () {
      if (this.apisource) {
        this.$api.delete(this.apisource + '/' + this.id).then((res) => {
          this.getRecords()
        })
      }
    },
    getRecords () {
      if (this.apisource) {
        this.$api.get(this.apisource).then(res => {
          this.data = res
        })
      }
    }
  }
}
</script>
