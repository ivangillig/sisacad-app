<template>

    <div class="col-12 mt-4">
        <div class="card">
            <h5>Información Personal</h5>

            <div class="p-fluid grid mt-5">
                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText type="text" required id="first_name" v-model.trim="student.first_name" :class="{'p-invalid': validationErrors.first_name && submitted}" />
                        <small v-show="validationErrors.first_name && submitted" class="p-error">{{msg.first_name}}</small>
                        <label for="first_name">Primer Nombre</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="middle_name" type="text" v-model.trim="student.middle_name"/>
                        <label for="middle_name">Segundo Nombre</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="first_lastname" required v-model.trim="student.first_lastname" type="text" :class="{'p-invalid': validationErrors.first_lastname && submitted}" />
                        <small v-show="validationErrors.first_lastname && submitted" class="p-error">{{msg.first_lastname}}</small>
                        <label for="first_lastname">Apellido Paterno</label>
                    </span>
                </div>
                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="second_lastname" type="text" v-model.trim="student.second_lastname" />
                        <label for="second_lastname">Apellido Materno</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <AutoComplete id="nationality" v-model="student.nationality"  :suggestions="filteredCountries"
                        @complete="searchCountry($event)" :dropdown="true" optionLabel="name" forceSelection>
                        <template #item="slotProps">
                            <div class="country-item">
                                <div class="ml-2">{{slotProps.item.name}}</div>
                            </div>
                        </template>
                    </AutoComplete>
                    <label for="nationality">Nacionalidad</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <Calendar id="birthdate" v-model.trim="student.birthdate" :minDate="minDate" :maxDate="maxDate" dateFormat="dd-mm-yy"
                        :showButtonBar="true" :showIcon="true" placeholder="dd-mm-aaaa"/>
                        <label for="birthdate">Fecha de nacimiento</label>
                    </span>
                </div>

                <div class="field col-12 md:col-6">
                    <span class="label-modified">
                        <InputText id="birth_place" type="text" v-model.trim="student.birth_place" />
                        <label for="birth_place">Lugar de nacimiento</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputMask id="doc_number" required mask="99.999.999" v-model.trim="student.doc_number"
                        :class="{'p-invalid': validationErrors.doc_number && submitted}" />
                        <small v-show="validationErrors.doc_number && submitted" class="p-error">{{msg.doc_number}}</small>
                        <label for="doc_number">DNI</label>
                    </span>
                </div>

                    <div class="field col-12 md:col-3" v-if="(1 > 0)">
                        <span class="label-modified">
                            <Dropdown id="gender" v-model="student.gender" :options="genderOptions" optionLabel="label" placeholder="Selecciona un género" >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value && slotProps.value.value">
                                        {{slotProps.value.label}}
                                    </div>
                                    <div v-else-if="slotProps.value && !slotProps.value.value">
                                        {{slotProps.value}}
                                    </div>
                                    <span v-else>
                                        {{slotProps.placeholder}}
                                    </span>
                                </template>                
                            </Dropdown>
                            <label for="gender">Género</label>
                        </span>
                    </div>

            </div>
        </div>
    </div>


    <div class="card">
        <h5>Domicilio y Contacto</h5>
        <div class="p-fluid grid mt-5">

            <div class="field col-12 md:col-6">
                <span class="label-modified">
                    <InputText id="street" type="text" v-model.trim="student.street"/>
                    <label for="street">Calle</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                <InputNumber id="number" type="text" v-model.trim="student.number" :useGrouping="false"/>
                <label for="number">Número</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                <InputNumber id="floor" type="text" v-model.trim="student.floor" showButtons/>
                <label for="floor">Piso</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber id="department" type="text" v-model.trim="student.department" showButtons/>
                    <label for="department">Depto</label>
                </span>
            </div>

            <div class="field col-12 md:col-4">
                <span class="label-modified">
                <InputText id="city" type="text" v-model.trim="student.city" />
                <label for="city">Ciudad</label>
                </span>
            </div>

            <div class="field col-12 md:col-3">
                <span class="label-modified">
                    <Dropdown id="state" v-model.trim="student.state" :options="stateItems" optionLabel="name" optionValue="value"
                    placeholder="Selecciona una"></Dropdown>
                    <label for="state">Provincia</label>
                </span>
            </div>

            <div class="field col-12 md:col-1">
                <span class="label-modified">
                <InputText id="cp" type="text" v-model.trim="student.cp"/>
                <label for="cp">CP</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber inputId="phone" v-model.trim="student.phone" max_length="10" :useGrouping="false" />
                    <label for="phone">Teléfono Personal</label>
                </span>
            </div>
            
            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber inputId="family_phone" v-model.trim="student.family_phone" max_length="10" :useGrouping="false" />
                    <label for="family_phone">Teléfono Familiar</label>
                </span>
            </div>
        </div>
    </div>

    <div class="grid grid-nogutter justify-content-between">
        <i></i>
        <Button label="Siguiente" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right"></Button>
    </div>
</template>

<script>
import CountryService from '../../../service/CountryService'
import AdminService from '../../../service/AdminService';

export default {
    created() {
        this.AdminService = new AdminService();
        this.countryService = new CountryService();


        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        //let prevMonth = (month === 0) ? 11 : month -1;
        //let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setDate(1)
        this.minDate.setMonth(0);
        this.minDate.setFullYear(1980);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
    },
    mounted(){
        this.countryService.getCountries().then(data => this.countries = data);

        if (this.$store.state.student) { 
            this.student.birthdate = this.$store.state.student.birthdate ? this.$store.state.student.birthdate : null 
            this.student = this.$store.state.student
        } 
        

    },
    data() {
        return {
			student: {},
            
            // first_name: '',
            // middle_name: null,
            // first_lastname: '',
            // second_lastname: null,
            // selectedCountry: null,
            // birthdate: '',
            // birth_place: null,
            // nationality: '',
            // doc_number: '',
            // filteredCountries: null,
            // gender: '',
            // phone: null,
            // family_phone: null,

            // street: null,
            // number: null,
            // floor: null,
            // department: null,
            // city: null,
            // state: null,
            // cp: null,

            msg: [],

            stateItems: [
                {name: 'Tierra Del Fuego', value: 1},
                {name: 'Santa Cruz', value: 2},
                {name: 'Chubut', value: 3},
                {name: 'Buenos Aires', value: 4},
            ],

            genderOptions: [
                {label: 'Sin especificar', value: 'Sin especificar'},
                {label: 'Sin género', value: 'Sin género'},
                {label: 'Másculino', value: 'Másculino'},
                {label: 'Femenino', value: 'Femenino'},
            ],
            submitted: false,
            validationErrors: {}
        }
    },
    countryService: null,
    methods: {
        nextPage() {

            console.log(this.student.doc_number)
            this.submitted = true;
            
            if (this.validateForm()) {
                this.AdminService.getPerson(this.student.doc_number.replaceAll('.', '')).then(response => {
                    if (response.status === 200) {
                        this.$toast.add({ severity: 'error', summary: 'Verifique el DNI', detail: 'Ya existe un alumno/a con ese documento', life: 4000 });
                    }
                }).catch(error => {
                    if (error.response.status === 404) {

                        this.$emit('next-page', {
                            formData: {
                                first_name: this.student.first_name,
                                middle_name: this.student.middle_name,
                                first_lastname: this.student.first_lastname,
                                second_lastname: this.student.second_lastname,
                                doc_number: this.student.doc_number,
                                birthdate: this.student.birthdate,
                                birth_place: this.student.birth_place,
                                nationality: this.student.nationality.code,
                                gender: this.student.gender,
                                phone: this.student.phone,
                                family_phone: this.student.family_phone,
                                street: this.student.street,
                                number: this.student.number,
                                floor: this.student.floor,
                                department: this.student.department,
                                city: this.student.city,
                                state: this.student.state,
                                cp: this.student.cp,
                            },
                            pageIndex: 0
                        });

                    } else if (error.message) {
                        console.log(error.message)
                    } else {
                        console.log(error)
                    }
                })
            }
        },
        validateForm() {
            if (!this.student.first_name || !this.student.first_name.trim()){
                this.validationErrors['first_name'] = true;
                this.msg['first_name'] = 'Este campo es obligatorio';
            }
            else if (!(/^[a-zA-Z]+$/.test(this.first_name))){
                    this.msg['first_name'] = 'El nombre solo puede contener letras';
                    this.validationErrors['first_name'] = true;
            }else
                delete this.validationErrors['first_name'];

            if (!this.student.first_lastname || !this.student.first_lastname.trim()){
                this.validationErrors['first_lastname'] = true;
                this.msg['first_lastname'] = 'Este campo es obligatorio';
            }
            else if (!(/^[a-zA-Z]+$/.test(this.first_lastname))){
                    this.msg['first_lastname'] = 'El apellido solo puede contener letras';
                    this.validationErrors['first_lastname'] = true;
            }
            else
                delete this.validationErrors['first_lastname'];

            if (!this.student.doc_number || !this.student.doc_number.trim()){
                this.validationErrors['doc_number'] = true;
                this.msg['doc_number'] = 'Este campo es obligatorio';
            }
            else
                delete this.validationErrors['doc_number'];

            return !Object.keys(this.validationErrors).length;
        },
        searchCountry(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCountries = [...this.countries];
                }
                else {
                    this.filteredCountries = this.countries.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        },
    }
}
</script>

<style lang="scss" scoped>
.Dropdown {
    width: 14rem;
}

.label-modified {
    display: block;
    position: relative;
}

.label-modified label{
    top: -.75rem;   
    font-size: 12px;
    position: absolute;
    margin-top: -.5rem;
    line-height: 1;
    left: 0.75rem;
    color: #6c757d;
    box-sizing: border-box;
    font-family: var(--font-family);
}
</style>