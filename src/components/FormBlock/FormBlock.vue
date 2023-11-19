<template>
  <div class="form-wrapper" @click="closeOpenDropMenu">
    <div class="form-container">
      <h2 class="title">Регистрация</h2>
      <form class="form">
        <div class="form-block">
          <div>
            <label for="surname" class="block-title">Фамилия*</label>
            <input id="surname" v-model="surname" class="input-field" type="text" required />
            <div class="error" v-if="v$.surname.$error">Обязательное поле</div>
          </div>
          <div>
            <label for="name" class="block-title">Имя*</label>
            <input id="name" v-model="name" class="input-field" type="text" required />
            <div class="error" v-if="v$.name.$error">Обязательное поле</div>
          </div>
          <div>
            <label for="mName" class="block-title">Отчество</label>
            <input id="mName" class="input-field" type="text" />
          </div>
          <div>
            <label class="block-title">Дата рождения*</label>
            <date-picker
              :date="dateOfBirth"
              prefix="birth"
              :currentOpenDropMenu="currentOpenDropMenu"
              @setActiveMenuName="setActiveMenuName"
              @updateDate="(date) => (dateOfBirth = date)"
            ></date-picker>
            <div class="error" v-if="v$.dateOfBirth.$error">Некорректная дата</div>
          </div>
          <div>
            <label for="phone" class="block-title">Номер телефона*</label>
            <div class="phone input-field">
              <span>+</span>
              <input
                @input="checkPhoneNumberLength"
                v-model="phoneNumber"
                id="phone"
                class="input-field"
                type="number"
                required
              />
            </div>
            <div class="error" v-if="v$.phoneNumber.$error">Обязательное поле</div>
            <div class="disable-message">
              <input id="disable-message" type="checkbox" />
              <label for="disable-message">Не отправлять смс</label>
            </div>
          </div>
          <div class="gender-wrapper">
            <label class="block-title">Пол</label>
            <div class="gender">
              <div class="gender-block">
                <input v-model="gender" class="input-radio" type="radio" name="gender" id="man" value="Мужской" />
                <label for="man">Мужской</label>
              </div>
              <div class="gender-block">
                <input v-model="gender" class="input-radio" type="radio" name="gender" id="women" value="Женский" />
                <label for="women">Женский</label>
              </div>
            </div>
          </div>
          <div class="select-blocks">
            <div>
              <drop-list
                @setActiveMenuName="setActiveMenuName"
                :currentOpenDropMenu="currentOpenDropMenu"
                listName="group"
                :options="groupList"
                :multiple="true"
                :selected="selectedGroups"
                v-model="selectedGroups"
              >
                <template v-slot:title>Группа клиента*</template>
                <template v-slot:field>{{
                  selectedGroups.length ? `Выбрано ${selectedGroups.length}` : "Выберите группу"
                }}</template>
              </drop-list>
              <div class="error" v-if="v$.selectedGroups.$error">Обязательное поле</div>
            </div>
            <div>
              <drop-list
                @setActiveMenuName="setActiveMenuName"
                :currentOpenDropMenu="currentOpenDropMenu"
                listName="doctor"
                :options="doctorsList"
                :selected="selectedDoctor"
                v-model="selectedDoctor"
              >
                <template v-slot:title>Лечащий врач</template>
                <template v-slot:field>{{ selectedDoctor ? selectedDoctor : "Выберите врача" }}</template>
              </drop-list>
            </div>
          </div>
        </div>
        <div class="form-block">
          <h2 class="title">Место жительства</h2>
          <div>
            <label for="index" class="block-title">Индекс</label>
            <input v-model="index" id="index" class="input-field" type="number" />
          </div>
          <div>
            <label for="country" class="block-title">Страна</label>
            <input v-model="country" id="country" class="input-field" />
          </div>
          <div>
            <label for="region" class="block-title">Область</label>
            <input v-model="region" id="region" class="input-field" />
          </div>
          <div>
            <label for="city" class="block-title">Город*</label>
            <input v-model="city" id="city" class="input-field" required />
            <div class="error" v-if="v$.city.$error">Обязательное поле</div>
          </div>
          <div class="input-row">
            <div>
              <label for="street" class="block-title">Улица</label>
              <input v-model="street" id="street" class="input-field" />
            </div>
            <div>
              <label for="home" class="block-title">Дом</label>
              <input v-model="home" id="home" class="input-field" type="number" />
            </div>
          </div>
        </div>
        <div class="form-block">
          <h2 class="title">Паспортные данные</h2>
          <div>
            <drop-list
              :options="documentList"
              @setActiveMenuName="setActiveMenuName"
              listName="document"
              :selected="typeOfDocument"
              :currentOpenDropMenu="currentOpenDropMenu"
              v-model="typeOfDocument"
            >
              <template v-slot:title>Тип документа*</template>
              <template v-slot:field>{{ typeOfDocument ? typeOfDocument : "Выберите документ" }}</template>
            </drop-list>
            <div class="error" v-if="v$.typeOfDocument.$error">Обязательное поле</div>
          </div>
          <div class="input-row">
            <div>
              <label for="serial" class="block-title">Серия</label>
              <input type="number" v-model="serial" id="serial" class="input-field" />
            </div>
            <div>
              <label for="numberOfDocument" class="block-title">Номер</label>
              <input type="number" v-model="numberOfDocument" id="numberOfDocument" class="input-field" />
            </div>
          </div>
          <div>
            <label for="receivedFrom" class="block-title">Кем выдан</label>
            <input v-model="receivedFrom" id="receivedFrom" class="input-field" required />
          </div>
          <div>
            <label class="block-title">Дата выдачи*</label>
            <date-picker
              :date="dateOfReceive"
              prefix="document"
              :currentOpenDropMenu="currentOpenDropMenu"
              @setActiveMenuName="setActiveMenuName"
              @updateDate="(date) => (dateOfReceive = date)"
              :menuOnTop="true"
            ></date-picker>
            <div class="error" v-if="v$.dateOfReceive.$error">Некорректная дата</div>
          </div>
          <div class="success-text" v-if="isSuccess">Пользователь успешно создан</div>
          <button @click.prevent="submit" class="registration-button">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import DropList from "@/UI/DropList.vue";
import { monthList } from "@/constants/MonthList.js";
import { getDayList } from "@/helpers/getDayList.js";
import { getYearsList } from "@/helpers/getYearsList.js";
import { getMonthIndex } from "@/helpers/getMonthIndex.js";
import DatePicker from "@/UI/DatePicker.vue";

// Custom validation
function isDateFull(value) {
  return value.day === "День" ? false : true;
}
function isDateCorrect(value) {
  return new Date() > new Date(value.year, getMonthIndex(value.month), value.day);
}
function isPhoneNumberCorrect(value) {
  return value.length === 11 && value !== "7" ? true : false;
}

export default {
  components: {
    "drop-list": DropList,
    "date-picker": DatePicker,
  },
  setup() {
    return {
      v$: useVuelidate(),
      monthList,
    };
  },
  data() {
    return {
      surname: "",
      name: "",
      mName: "",
      dateOfBirth: {
        day: "День",
        month: "Январь",
        year: new Date().getFullYear(),
      },
      phoneNumber: "7",
      gender: "",
      sendMessage: true,
      selectedGroups: [],
      selectedDoctor: "",
      currentOpenDropMenu: "",
      index: "",
      country: "",
      region: "",
      city: "",
      street: "",
      home: "",
      typeOfDocument: "",
      serial: "",
      numberOfDocument: "",
      receivedFrom: "",
      dateOfReceive: {
        day: "День",
        month: "Январь",
        year: new Date().getFullYear(),
      },
      isSuccess: false,
      groupList: ["VIP", "Проблемные", "ОМС"],
      doctorsList: ["Иванов", "Захаров", "Чернышева"],
      documentList: ["Паспорт", "Свидетельство о рождении", "Вод. удостоверение"],
    };
  },
  validations() {
    return {
      name: { required },
      surname: { required },
      dateOfBirth: { required },
      phoneNumber: { isPhoneNumberCorrect },
      selectedGroups: { required },
      city: { required },
      typeOfDocument: { required },
      dateOfBirth: { isDateFull, isDateCorrect },
      dateOfReceive: { isDateFull, isDateCorrect },
    };
  },
  methods: {
    submit() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.isSuccess = true;
      }
    },
    setActiveMenuName(name) {
      if (name === this.currentOpenDropMenu) {
        this.currentOpenDropMenu = "";
      } else {
        this.currentOpenDropMenu = name;
      }
    },
    closeOpenDropMenu(e) {
      const target = e.target;
      if (!target.closest(".select-wrapper") && this.currentOpenDropMenu !== "") {
        this.currentOpenDropMenu = "";
      }
    },
    isDateFull() {
      if (this.dateOfBirth.day === "День" || this.dateOfReceive.day === "День") {
        return false;
      }
    },
    checkPhoneNumberLength() {
      if (this.phoneNumber.length > 11) {
        this.phoneNumber = this.phoneNumber.slice(0, 11);
      }
      if (this.phoneNumber.length < 2) {
        this.phoneNumber = "7";
      }
    },
  }
};
</script>
<style lang="scss">
.title {
  text-align: center;
  margin: 20px 0px;
}
.form-wrapper {
  display: grid;
  justify-content: center;
  row-gap: 15px;
  min-height: 100vh;
  padding: 50px 20px;
}
.form {
  display: grid;
  row-gap: 15px;
}
.gender {
  display: flex;
  column-gap: 20px;
  & .gender-block {
    display: flex;
    column-gap: 7px;
  }
}
.input-field {
  border: 1px solid rgb(151, 151, 151);
  font-size: 16px;
  padding: 10px 10px 10px 0px;
  padding-left: 10px;
  width: 100%;
  border-radius: 5px;
  &.input-field_date {
    width: 50px;
    padding-bottom: 5px;
  }
}
.registration-button {
  border: 0;
  border-radius: 6px;
  width: 100%;
  height: 40px;
  font-size: 18px;
  background-color: rgb(68, 68, 255);
  margin-top: 20px;
  color: white;
  transition: all 0.2s ease;
  &:hover {
    background-color: white;
    color: rgb(68, 68, 255);
    border: 1px solid rgb(68, 68, 255);
  }
}
.error {
  color: rgb(250, 46, 46);
  margin-top: 5px;
}

.input-radio {
  width: 20px;
  height: 20px;
}
.disable-message {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 10px;
  & input {
    width: 20px;
    height: 20px;
  }
}
.select-blocks {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.input-date-wrapper.input-row {
  gap: 0;
}
.phone {
  display: flex;
  align-items: center;
  border: 1px solid rgb(151, 151, 151);
  .input-field {
    border: 0;
    padding: 0;
  }
}
.block-title {
  display: block;
  margin-bottom: 10px;
  color: rgb(100, 100, 100);
}
.input-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.form-block {
  display: grid;
  gap: 15px;
}
.success-text {
  color: rgb(1, 202, 1);
  font-size: 24px;
  text-align: center;
}
@media (max-width: 350px) {
  .select-blocks {
    flex-direction: column;
  }
}
</style>
