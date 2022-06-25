const responces: Response[] = [
    {
        key: /^(?=.*You do not have access to FyreControl).*$/mgi,
        value: 'Hey there,\n\nFyreNodes is currently in a closed state. This means that you will not be able to access our control panel.'
    }
];

interface Response {
    key: RegExp;
    value: string;
};

export default responces;