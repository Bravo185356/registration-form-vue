<template>
  <div class="select-wrapper">
    <div class="block-title" @click="toggleList">
      <slot name="title" class="title"></slot>
    </div>
    <div class="select" :class="{ 'select-date': isDate }" @click="toggleList">
      <slot name="field"></slot>
      <span @click="clearSelected" class="clear-select" v-if="multiple && selected.length">X</span>
    </div>
    <ul class="select-list" :class="{ 'position-top': menuOnTop }" v-if="currentOpenDropMenu === listName">
      <li :class="{ selected: isOptionSelected(option) }" @click="addSelectOption(option)" v-for="option in options">
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    options: Array,
    selected: Array | String,
    multiple: Boolean,
    listName: String,
    currentOpenDropMenu: String,
    menuOnTop: Boolean,
  },
  emits: ["input", "setActiveMenuName"],
  methods: {
    toggleList() {
      this.$emit("setActiveMenuName", this.listName);
    },
    addSelectOption(option) {
      if (this.multiple) {
        let options = [...this.selected];
        const isItemAlreadyExist = this.selected.find((group) => group === option);
        if (isItemAlreadyExist) {
          options = this.selected.filter((group) => group !== option);
        } else {
          options.push(option);
        }
        this.$emit("input", options, this.getFieldName);
      } else {
        let selectOption = "";
        selectOption = option;
        this.$emit("input", selectOption, this.getFieldName);
        this.$emit("setActiveMenuName", "");
      }
    },
    clearSelected() {
      this.$emit("input", []);
    },
    isOptionSelected(listItem) {
      if (this.multiple) {
        return this.selected.find((selectedOption) => selectedOption === listItem);
      } else {
        return this.selected === listItem;
      }
    },
  },
  computed: {
    isDate() {
      return this.listName.split("-").length === 2;
    },
    getFieldName() {
      return this.listName.split("-")[1];
    },
  },
};
</script>
<style lang="scss" scoped>
.select-wrapper {
  display: inline-block;
  position: relative;
}
.select {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid rgb(194, 194, 194);
  cursor: pointer;
  min-width: 150px;
}
.clear-select {
  display: block;
  text-align: center;
  width: 18px;
  height: 18px;
  border: 1px solid rgb(36, 36, 36);
  border-radius: 50%;
  font-size: 14px;
}
.select-list {
  position: absolute;
  display: grid;
  top: 102%;
  left: 0;
  min-width: auto;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 7px rgb(0, 0, 0);
  z-index: 100;
  max-height: 300px;
  overflow-y: scroll;
  & li {
    padding: 5px 10px;
    cursor: pointer;
    &:hover,
    &.selected {
      background-color: rgb(68, 68, 255);
      transition: background-color, color 0.3s ease;
      color: white;
    }
  }
}
.select-wrapper .select-date {
  border: 1px solid rgb(194, 194, 194);
  min-width: 100px;
}
.select-wrapper:nth-child(1) .select-date {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
  min-width: 70px;
}
.select-wrapper:nth-child(2) .select-date {
  border-radius: 0;
}
.select-wrapper:nth-child(3) .select-date {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
  min-width: 70px;
}
.block-title {
  margin-bottom: 10px;
  cursor: pointer;
}
.position-top {
  top: 15%;
  transform: translateY(-100%);
}
</style>
