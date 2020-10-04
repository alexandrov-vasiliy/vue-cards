let app = new Vue({
    el: '#app',
    data: {
        cardNameInput: '',//переменная привязанная к дерективе v-model у инпута с названием
        cardDescriptionInput: '',//переменная привязанная к дерективе v-model у инпута с описанием
        imageSrcInput: '',//в эту переменную записываем картинку в base64

        cards: JSON.parse(localStorage.getItem("cards")),//карточки))
    },
    methods: {
        //перевод в кодировку base64
        ImageBased(){


            let file    = document.querySelector('input[type=file]').files[0];
            let reader  = new FileReader();

            reader.onloadend =  () => {
                console.log(reader.result);
                this.imageSrcInput = reader.result;

            };

            reader.readAsDataURL(file);

        },

        /*метод добавления карточки создаем
            новый объект из данных с
            инпутов и если он не пустой то пушим и
            сохраняем в локал сторедж*/

        addCard(){

            const newCard = {
                id:Date.now(),
                name: this.cardNameInput,
                description: this.cardDescriptionInput,
                src: this.imageSrcInput
            };
            if(newCard.name !== '' && newCard.description !== '' && newCard.src !== ''){


                this.cards.push(newCard);
                localStorage.setItem("cards", JSON.stringify(this.cards));
                let savedCards = JSON.parse(localStorage.getItem("cards"));
                console.log(savedCards);
            }


        },
        //метод удаления карточки через филтр (принемаем id карточки и фильтруем массив что бы не было принятого id)
        deleteCard(id){
            this.cards = this.cards.filter(cards=>cards.id !==id);
            localStorage.setItem("cards", JSON.stringify(this.cards));
        },


    }

});
