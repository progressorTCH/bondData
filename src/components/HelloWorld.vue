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
import bondedList from "../data/bondConfig.json"
import dataConfig from "../util/dataConfig";
import {XlsxWorkbook,XlsxSheet,XlsxDownload} from "vue-xlsx";
import gql from 'graphql-tag';

let dataGql = gql`
  query poolTransactions($address: Bytes!) {
    mints(first: 35, orderBy: timestamp, orderDirection: desc, where: { pair: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      to
      amount0
      amount1
      amountUSD
    }
    swaps(first: 35, orderBy: timestamp, orderDirection: desc, where: { pair: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      from
      amount0In
      amount1In
      amount0Out
      amount1Out
      amountUSD
    }
    burns(first: 35, orderBy: timestamp, orderDirection: desc, where: { pair: $address }) {
      id
      timestamp
      pair {
        token0 {
          id
          symbol
        }
        token1 {
          id
          symbol
        }
      }
      sender
      amount0
      amount1
      amountUSD
    }
  }
`

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
    let _this = this
    bondedList.map((v)=>{
      _this.getData(v)
    })
    console.log(_this.sheets)
  },
  methods: {
    getData(params){
      let _this = this
      this.$apollo.addSmartQuery('bondZero', {
        query: dataGql, variables:{
          "address": params.address
        }, 
        result({data} ) {
          let turnedData = dataConfig(data);
          let sheetItem = {
            name: params.sheetName,
            data: turnedData
          };
          _this.sheets.push(sheetItem);
        },// 错误处理
        error(error) {
          console.error('We\'ve got an error!', error)
        }
      });
    }
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
