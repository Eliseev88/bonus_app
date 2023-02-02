import { useEffect, useState } from 'react';
import styles from './Bonus.module.scss'

interface IBonus {
    currentQuantity: number;
    dateBurning: string;
    forBurningQuantity: number;
}

export const Bonus = () => {
    const [token, setToken] = useState<string>(null);
    const [bonus, setBonus] = useState<IBonus>(null);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'AccessKey': process.env.REACT_APP_AccessKey 
            },
            body: JSON.stringify({
                "idClient": process.env.REACT_APP_ClientID,
                "accessToken": "",
                "paramName": "device",
                "paramValue": process.env.REACT_APP_DeviceID,
                "latitude": 0,
                "longitude": 0,
                "sourceQuery": 0
            })
        };
        fetch('https://mp1.iprobonus.com/api/v3/clients/accesstoken', requestOptions)
            .then(response => response.json())
            .then(data => setToken(data.accessToken));
    }, []);

    useEffect(() => {
        if (token) {
            const headers = {
                'Content-Type': 'application/json',
                'AccessKey': process.env.REACT_APP_AccessKey,
                'AccessToken': token,
            }
            fetch(`https://mp1.iprobonus.com/api/v3/ibonus/generalinfo/${token}`, { headers })
                .then(response => response.json())
                .then(data => setBonus({
                    currentQuantity: data.data.currentQuantity,
                    dateBurning: data.data.dateBurning.slice(0, 10),
                    forBurningQuantity: data.data.forBurningQuantity
                }));
        }
    }, [token]);

    return (
        <section className={styles.bonus}>
            <div className={styles.bonus__card}>
                <h2 className={styles.card__title}>{bonus && bonus.currentQuantity} бонусов</h2>
                <p className={styles.card__description}>{bonus && bonus.dateBurning} сгорит
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.6533 11.4134C2.46742 9.43863 3.13318 5.24933 5.83783 3.80468C6.55744 3.52587 7.14003 2.97078 7.45967 2.25937C7.7793 1.54796 7.81029 0.737409 7.54592 0.00299072C7.54592 0.00299072 9.82304 1.54372 8.73182 5.10783C7.6406 8.67194 9.58585 9.24959 9.58585 9.24959C9.14308 8.67691 8.93882 7.951 9.01684 7.22731C9.07406 6.72254 9.23962 6.23667 9.50185 5.80388C9.76408 5.3711 10.1166 5.0019 10.5346 4.72239C9.72838 7.61169 13.001 9.05211 13.001 12.5001C13.001 15.948 9.3955 17.003 9.3955 17.003C9.39635 16.3675 9.25093 15.7405 8.97081 15.1721C8.69068 14.6037 8.28362 14.1096 7.78208 13.7293C6.07399 12.4768 6.64402 9.54002 6.64402 9.54002C4.4595 12.7662 5.55282 17.004 5.55282 17.004C5.55282 17.004 4.55626 15.608 3.60756 15.4633C2.65885 15.3186 2.13664 13.9701 2.13664 13.9701C2.15057 14.4998 2.29186 15.0181 2.54823 15.4797C2.8046 15.9413 3.16828 16.3323 3.60756 16.6186C-3.74597 13.1517 2.42166 7.99819 2.42166 7.99819C1.70909 10.7396 3.6533 11.4134 3.6533 11.4134Z" fill="url(#paint0_linear_1_49)" />
                        <defs>
                            <linearGradient id="paint0_linear_1_49" x1="6.99978" y1="6.00006" x2="6.99978" y2="17.0001" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#FFB258" />
                                <stop offset="1" stopColor="#C71515" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {bonus && bonus.forBurningQuantity} бонусов</p>
                <button className={styles.card__button}></button>
            </div>

        </section>
    )
}