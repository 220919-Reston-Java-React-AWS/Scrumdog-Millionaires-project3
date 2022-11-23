import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { DirectMessageModel } from '../../models/DirectMessageModel';

interface dmProps {
    dm: DirectMessageModel;
    key?: number;
    dms: DirectMessageModel[];
    setDMs: (updatedDM: DirectMessageModel[]) => void;
}

export const DirectMessageCard = (props: dmProps) => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    console.log(props.dm.sender);

    return (
        <Card sx={{ maxWidth: "100%", marginTop: "3%" }}>
            <CardHeader 
            title={props.dm.sender.firstName}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.dm.text}
                </Typography>
            </CardContent>
        </Card>
    )
}