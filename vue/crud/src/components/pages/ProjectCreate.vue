<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Create New Project</h2>
    <div class="card">
        <div class="card-header">
            <router-link 
                class="btn btn-outline-info float-right"
                to="/">View All Projects
            </router-link>
        </div>
        <div class="card-body">
            <form>
                <div class="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        v-model="project.name"
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"/>
                </div>
                <div class="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        v-model="project.description"
                        class="form-control"
                        id="description"
                        rows="3"
                        name="description"></textarea>
                </div>
                <button 
                    @click="handleSave()"
                    :disabled="isSaving"
                    type="button"
                    class="btn btn-outline-primary mt-3">
                    Save Project
                </button>
            </form>
        </div>
    </div>
  </layout-div>
</template>
 
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
import Swal from 'sweetalert2'
 
export default {
  name: 'ProjectCreate',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      project: {
        name: '',
        description: '',
      },
      isSaving:false,
    };
  },
  methods: {
    handleSave() {
        this.isSaving = true
        axios.post('https://mock-api.binaryboxtuts.com/api/projects', this.project)
          .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Project saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            this.isSaving = false
            this.project.name = ""
            this.project.description = ""
            return response
          })
          .catch(error => {
            this.isSaving = false
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            return error
          });
    },
  },
};
</script>