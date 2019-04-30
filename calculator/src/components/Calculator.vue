<template lang="pug">
  .calculator
    .display {{current || '0'}}
    .btn(@click='clear') C
    .btn(@click='sign') +/-
    .btn(@click='percent') %
    .btn.operator(@click='divide') &div;
    .btn(@click="append('7')") 7
    .btn(@click="append('8')") 8
    .btn(@click="append('9')") 9
    .btn.operator(@click='times') x
    .btn(@click="append('4')") 4
    .btn(@click="append('5')") 5
    .btn(@click="append('6')") 6
    .btn.operator(@click='minus') -
    .btn(@click="append('1')") 1
    .btn(@click="append('2')") 2
    .btn(@click="append('3')") 3
    .btn.operator(@click='add') +
    .btn.zero(@click="append('0')") 0
    .btn(@click='dot') .
    .btn.operator(@click='equal') =
</template>

<script>
export default {
  data() {
    return {
      previous: null,
      current: '',
      operator: null,
      operatorClicked: false,
    }
  },
  methods: {
    clear() {
      this.current = '';
    },
    sign() {
      this.current = this.current.charAt(0) === '-' ? 
        this.current.slice(1) : `-${this.current}`;
    },
    percent() {
      this.current = `${parseFloat(this.current) / 100}`;
    },
    append(number) {
      if (this.operatorClicked) {
        this.current = '';
        this.operatorClicked = false;
      }
      this.current = `${this.current}${number}`;
    },
    dot() {
      if (this.current.indexOf('.') === -1) {
        this.append('.');
      }
    },
    setPrevious() {
      this.previous = this.current;
      this.operatorClicked = true;
    },
    divide() {
      this.operator = (a, b) => a / b;
      this.setPrevious();
    },
    times() {
      this.operator = (a, b) => a * b;
      this.setPrevious();
    },
    minus() {
      this.operator = (a, b) => a - b;
      this.setPrevious();
    },
    add() {
      this.operator = (a, b) => a + b;
      this.setPrevious();
    },
    equal() {
      this.current = this.operator(
        parseFloat(this.current), 
        parseFloat(this.previous)
      );
      
      this.previous = null;
    }
  }
}
</script>

<style lang="stylus">
$heightButton = 70px

.calculator
  margin 0 auto
  width 400px
  font-size 25px
  line-height $heightButton
  display grid
  grid-template-columns repeat(4, 1fr)
  grid-auto-rows minmax($heightButton, auto)
  color white
  border-radius 5px
  overflow hidden
  box-shadow: 0px 8px 70px rgba(0, 0, 0, 0.5);

.display
  grid-column 1 / 5
  background-color #1a1b1c  
  color #3276f5
  font-size 50px
  line-height $heightButton * 2

.zero
  grid-column 1 / 3

.btn
  background-color #1e1f22
  cursor pointer
  transition background .3s ease
  
  &:hover
    background-color #17181b

.operator
  background-color #3276f5

  &:hover
    background-color #2962cc
</style>
