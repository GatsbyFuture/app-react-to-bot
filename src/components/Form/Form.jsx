import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

const Form = () => {

    const [subject, setSubject] = useState('false');
    const { tg } = useTelegram();
    const [data, setData] = useState({
        fullName: '',
        dataOfBirthday: '',
        specialty: '',
        workPlace: '',
        phoneNumber: '',
        managerName: '',

    })
    const {
        fullName,
        dataOfBirthday,
        specialty,
        workPlace,
        phoneNumber,
        managerName
    } = data

    const onChange = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    const onSendData = useCallback(() => {
        const data = {
            fullName,
            dataOfBirthday,
            specialty,
            workPlace,
            phoneNumber,
            managerName
        }
        tg.sendData(JSON.stringify(data));
    }, [
        fullName,
        dataOfBirthday,
        specialty,
        workPlace,
        phoneNumber,
        managerName
    ]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Malumotlarni saqlash"
        });
    }, []);

    useEffect(() => {
        if (!fullName || !dataOfBirthday || !specialty || !workPlace || phoneNumber) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [
        fullName,
        dataOfBirthday,
        specialty,
        workPlace,
        phoneNumber
    ]);

    return (
        <div className={'form'}>
            <h3>Maydonlarni to'ldiring</h3>
            <input
                className={"input"}
                type="text"
                placeholder={'FIO'}
                value={fullName}
                id='fullName'
                onChange={onChange}
            />
            <input
                className={"input"}
                type="date"
                placeholder={'Tugulgan kun'}
                value={dataOfBirthday}
                id='dataOfBirthday'
                onChange={onChange}
            />
            <input
                className={"input"}
                type="text"
                placeholder={'Mutaxasislik'}
                value={specialty}
                id='specialty'
                onChange={onChange}
            />
            <input
                className={"input"}
                type="text"
                placeholder={'Ish joyi'}
                value={workPlace}
                id='workPlace'
                onChange={onChange}
            />
            <input
                className={"input"}
                type="number"
                placeholder={'+998...'}
                value={phoneNumber}
                id='phoneNumber'
                onChange={onChange}
            />
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className={'select'}>
                <option value='false'>Menejer yo'q</option>
                <option value='true'>Meneger bor</option>
            </select>
            {subject === 'true' ?
                <input
                    className={"input"}
                    type="text"
                    placeholder={'Meneger FIO'}
                    value={managerName}
                    id='managerName'
                    onChange={onChange}
                />
                : null}
        </div>
    );
};

export default Form;