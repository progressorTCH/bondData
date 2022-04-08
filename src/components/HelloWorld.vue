<template>
  <div class="hello">
    <section>
      <xlsx-workbook>
        <xlsx-sheet
          :collection="sheet.data"
          v-for="sheet in sheets"
          :key="sheet.name"
          :sheet-name="sheet.name"
        />
        <xlsx-download>
          <button>Download</button>
        </xlsx-download>
      </xlsx-workbook>
    </section>
  </div>
</template>

<script>
import bond0_data from "../data/bond0.json";
import bond1_data from "../data/bond1.json";
import bond2_data from "../data/bond2.json";
import bond3_data from "../data/bond3.json";
import bond4_data from "../data/bond4.json";
import bond5_data from "../data/bond5.json";
import bond6_data from "../data/bond6.json";
import bond7_data from "../data/bond7.json";
import dataConfig from "../util/dataConfig";
import {XlsxWorkbook,XlsxSheet,XlsxDownload} from "vue-xlsx";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload
  },
  data() {
    return {
      sheets:[]
    };
  },
  mounted() {
    let table_data0 = dataConfig(bond0_data);
    let table_data1 = dataConfig(bond1_data);
    let table_data2 = dataConfig(bond2_data);
    let table_data3 = dataConfig(bond3_data);
    let table_data4 = dataConfig(bond4_data);
    let table_data5 = dataConfig(bond5_data);
    let table_data6 = dataConfig(bond6_data);
    let table_data7 = dataConfig(bond7_data);
    let sheetItem0 = {
      name: "bond0",
      data: table_data0
    };
    let sheetItem1 = {
      name: "bond1",
      data: table_data1
    };
    let sheetItem2 = {
      name: "bond2",
      data: table_data2
    };
    let sheetItem3 = {
      name: "bond3",
      data: table_data3
    };
    let sheetItem4 = {
      name: "bond4",
      data: table_data4
    };
    let sheetItem5 = {
      name: "bond5",
      data: table_data5
    };
    let sheetItem6 = {
      name: "bond6",
      data: table_data6
    };
    let sheetItem7 = {
      name: "bond7",
      data: table_data7
    };
    this.sheets.push(sheetItem0);
    this.sheets.push(sheetItem1);
    this.sheets.push(sheetItem2);
    this.sheets.push(sheetItem3);
    this.sheets.push(sheetItem4);
    this.sheets.push(sheetItem5);
    this.sheets.push(sheetItem6);
    this.sheets.push(sheetItem7);
  },
  methods: {
    
    formatUser: function (value) {
      let userhead = value.substr(0, 4);
      let userfoot = value.substr(value.length - 4, value.length);
      let str = userhead + "****" + userfoot;
      return str;
    },
    formatValue: function (value) {
      let str = Math.floor(value * 10000) / 10000;
      return str;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
