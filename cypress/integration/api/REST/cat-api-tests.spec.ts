import { post } from "cypress/types/jquery";

let voteId;

context('Vote Function', () => {

    beforeEach( function (){

        cy.fixture('cat-api').then((data) => {
            this.data = data;
            this.body = data.body;
        })

    })

    it('POST', function (){

        cy.request({

            method : 'POST',
            url : '/votes',
            headers : {
                'content-type' : 'application/json',
                'x-api-key' : ''+this.data.xapikey+''

            },
            body : {
                'image_id' :''+this.body.image_id+'',
                'sub_id': ''+this.body.sub_id+'',
                'value' : this.body.value
            }

        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.message).to.equal('SUCCESS');
            voteId = response.body.id;
        });


    });

    it('GET', function (){

        cy.request({

            method : 'GET',
            url : '/votes/'+voteId+'',
            headers : {
                'content-type' : 'application/json',
                'x-api-key' : ''+this.data.xapikey+''

            },

        }).then((response) => {

            expect(response.status).to.eq(200);
        });


    });


    it('DELETE', function () {

        cy.request({

            method : 'DELETE',
            url : '/votes/'+ voteId +'',
            headers : {
                'content-type' : 'application/json',
                'x-api-key' : ''+this.data.xapikey+''

            },

        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.message).to.equal('SUCCESS');
        });

    });    

})