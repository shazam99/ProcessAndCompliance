import React, {createContext, useEffect, useState} from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        form1: {},
        barf: {},
        sponsorBankForm: {}
    });

    const updateFormData = (formName, data) => {
        console.log(formName, data);
        setFormData({
            ...formData,
            [formName]: data,
        });
    };

    useEffect(() => {
        console.log('Updated sponsorBankForm:', formData.sponsorBankForm);
    }, [formData]);

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};