import React from 'react';
import Vote from "./Vote";

describe('CreateQuestion', () => {
    it('renders correctly', () => {
        let wrapper;

        wrapper = shallow(<Vote currentUser="Giorgia" score={2} votes={[]}/>);
        expect(wrapper).toMatchSnapshot();

        let votes;

        votes = [
            {
                "_links": {},
                "answer_id": 2,
                "user": "Giorgia",
                "value": -1
            },
            {
                "_links": {},
                "answer_id": 2,
                "user": "fghj",
                "value": 1
            }
        ];

        wrapper = shallow(<Vote currentUser="Giorgia" score={2} votes={votes}/>);
        expect(wrapper).toMatchSnapshot();

        votes = [
            {
                "_links": {},
                "answer_id": 2,
                "user": "asd",
                "value": -1
            },
            {
                "_links": {},
                "answer_id": 2,
                "user": "fghj",
                "value": 1
            }
        ];

        wrapper = shallow(<Vote currentUser="Giorgia" score={2} votes={votes}/>);
        expect(wrapper).toMatchSnapshot();

        votes = [
            {
                "_links": {},
                "answer_id": 2,
                "user": "Giorgia",
                "value": +1
            },
            {
                "_links": {},
                "answer_id": 2,
                "user": "fghj",
                "value": 1
            }
        ];

        wrapper = shallow(<Vote currentUser="Giorgia" score={2} votes={votes}/>);
        expect(wrapper).toMatchSnapshot();

        wrapper = shallow(<Vote currentUser={null} score={2}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
