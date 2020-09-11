import mock from 'axios-mock-adapter';
import reducer,{initialState,insertCard} from './cardSlice';

describe('test the card slice', () => {
    test('Insert a card as a user', async ()=>{
        // await axios.post('/insertCard',{'card':card,'user':user});
        mock.onPost('/insertCard').reply(200,{'working':'itworked'});
        
    });
    

});