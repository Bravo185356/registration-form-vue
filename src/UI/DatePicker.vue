<template>
  <div>
    <drop-list
      :currentOpenDropMenu="currentOpenDropMenu"
      @setActiveMenuName="(value) => $emit('setActiveMenuName', value)"
      @input="setDate"
      :listName="prefix + '-' + 'day'"
      :options="dayList"
      :menuOnTop="menuOnTop"
    >
      <template v-slot:field>{{ date.day }}</template>
    </drop-list>
    <drop-list
      :currentOpenDropMenu="currentOpenDropMenu"
      @setActiveMenuName="(value) => $emit('setActiveMenuName', value)"
      @input="setDate"
      :listName="prefix + '-' + 'month'"
      :options="monthList"
      :menuOnTop="menuOnTop"
    >
      <template v-slot:field>{{ date.month }}</template>
    </drop-list>
    <drop-list
      :currentOpenDropMenu="currentOpenDropMenu"
      @setActiveMenuName="(value) => $emit('setActiveMenuName', value)"
      @input="setDate"
      :listName="prefix + '-' + 'year'"
      :options="yearsList"
      :menuOnTop="menuOnTop"
    >
      <template v-slot:field>{{ date.year }}</template>
    </drop-list>
  </div>
</template>
<script>
import { monthList } from "@/constants/MonthList.js";
import { getDayList } from "@/helpers/getDayList.js";
import { getYearsList } from "@/helpers/getYearsList.js";
import { getMonthIndex } from "@/helpers/getMonthIndex.js";
import DropList from "@/UI/DropList.vue";
export default {
  components: {
    "drop-list": DropList,
  },
  props: {
    date: Object,
    prefix: String,
    currentOpenDropMenu: String,
    menuOnTop: Boolean,
  },
  emits: ["setActiveMenuName", "updateDate"],
  setup() {
    return {
      monthList,
      dayList: getDayList(0),
      yearsList: getYearsList(new Date().getFullYear()),
    };
  },
  data() {
    return {
      selectedDate: {
        day: this.date.day,
        month: this.date.month,
        year: this.date.year,
      },
    };
  },
  methods: {
    setDate(value, field) {
      this.selectedDate[field] = value;
      if (field === "month") {
        this.dayList = getDayList(getMonthIndex(this.selectedDate.month), this.selectedDate.year);
      }
      this.$emit("updateDate", this.selectedDate);
    },
  },
};
</script>
<style></style>
