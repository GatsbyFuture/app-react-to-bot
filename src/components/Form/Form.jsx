import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

const Form = () => {

    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, []);

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Send data"
        });
    }, []);

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street]);

    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value);
    }

    return (
        <div className={'form'}>
            <h3>fill your data</h3>
            <input
                className={"input"}
                type="text"
                placeholder={'Region'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={"input"}
                type="text"
                placeholder={'street'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Physical face</option>
                <option value={'legal'}>Legal face</option>
            </select>
        </div>
    );
};

export default Form;