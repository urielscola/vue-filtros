'use strict';

let app = new Vue({
	el: "#app",
	data: {
		filterParams: [],
		filteredList: [],
		originalList: [],
		queryName: "",
		minProductPrice: 0,
		maxProductPrice: 0
	},
	methods: {
	  getProduct: function(total) {

			const cores = ['red', 'blue', 'green', 'violet', 'yellow', 'orange', 'brown', 'white', 'black', 'gray'];
			const tamanhos = ['PP', 'P', 'M', 'G', 'GGG', '36', '37', '38', 'Un', '39'];
			const voltagens = ['110', '220', 'bivolt'];
			let JSON = [];

			for (let i = 0 - 1; i < total; i++) {

				var numeroCores = Math.floor((Math.random() * 2) + 1);
				var numeroTamanhos = Math.floor((Math.random() * 3) + 1);
				var numeroVoltagens = Math.floor((Math.random() * 2) + 1);
				var coresFinal = [];
				var tamanhosFinal = [];
				var voltagensFinal = [];

				var preco = Math.floor((Math.random() * 500) + 1);

				for (var j = 0; j < numeroCores; j++) {
					var index = Math.floor((Math.random() * 10) + 1) - 1;

					if (coresFinal.indexOf(cores[index]) === -1 ) {
						coresFinal.push(cores[index]);
					}
				}

				for (var j = 0; j < numeroTamanhos; j++) {
					var index = Math.floor((Math.random() * 10) + 1) - 1;

					if (tamanhosFinal.indexOf(tamanhos[index]) === -1 ) {
						tamanhosFinal.push(tamanhos[index]);
					} 
				}

				for (var j = 0; j < numeroVoltagens; j++) {
					var index = Math.floor((Math.random() * 3) + 1) - 1;

					if (voltagensFinal.indexOf(voltagens[index]) === -1 ) {
						voltagensFinal.push(voltagens[index]);
					}
				}

				let newProduct = {
					"nome": `Produto_${i+1}`,
					"cor": coresFinal,
					"tamanho": tamanhosFinal,
					"voltagem": voltagensFinal,
					"preco": preco,
					"imagem": "http://placehold.it/200x250"
				}

				JSON.push(newProduct);
			}
			return JSON;
		},
		filter: function(e) {

			let type = e.target.name;
			let value = e.target.value;
			let $this = this;
			let _this = this.$data;

			$this.mountParams(e.target.name, e.target.value, e.target.checked);

			_this.filteredList = _this.originalList;
			_this.filteredList = _this.filteredList.filter(function (el) {
				let validou = true;
				for (let j = 0; j < _this.filterParams.length; j++) {
					let key = Object.keys(_this.filterParams[j]);
					let valArr = _this.filterParams[j][key];
					
					if (el[key]) {
						if (!$this.findOne(el[key], valArr)) {
							validou = false;
						}
					}
				}
				return validou;
			});
		},
		mountParams: function(type, value, isChecked) {
			if (isChecked) {
				var existe = false;
				
				for (let i = 0; i < this.$data.filterParams.length; i++) {
					if (this.$data.filterParams[i][type]) {
						this.$data.filterParams[i][type].push(value);
						existe = true;
						break;
					}		
				}
				if (existe) {
				} else {
					this.$data.filterParams.push({[type] : [value]});
				}
			} else {
				for (let i = 0; i < this.$data.filterParams.length; i++) {
					
					if (this.$data.filterParams[i][type]) {
						this.$data.filterParams[i][type].splice(this.$data.filterParams[i][type].indexOf(value), 1);
						this.$data.filterParams[i][type].length === 0 ? this.$data.filterParams.splice(this.$data.filterParams.indexOf(this.$data.filterParams[i]), 1) : undefined;
						break;
					}		
				}
			}
		},
		clear: function() {
			this.$data.filteredList = this.$data.originalList;
		},
		findOne: function(searchArr, testArr) {
	    return testArr.some(function (v) {
	        return searchArr.indexOf(v) >= 0;
	    });
		},
		setPrices: function(list) {
			let _this = this.$data;
			list.forEach(function(el, index) {
				if (index === 0) {
					 _this.minProductPrice = el.preco;
					 _this.maxProductPrice = el.preco;
				}
				el.preco < _this.minProductPrice ? _this.minProductPrice = el.preco : undefined;
				el.preco > _this.maxProductPrice ? _this.maxProductPrice = el.preco : undefined;
			});
		}
	},
	watch: {
		filteredList: function() {
			this.$data.filterParams.length === 0 ? this.$data.filteredList = this.$data.originalList : undefined;
		}
	},
	created: function() {
		this.$data.originalList = this.getProduct(100);
		this.setPrices(this.$data.originalList);
		this.$data.filteredList = this.originalList;
	}
})