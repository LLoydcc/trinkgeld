import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

export default function Counter(props) {

    const [count, setCount] = useState(0);
    const amount = props.amount;
    const description = props.description;
    const isMoney = props.isMoney;

    return (
        <Paper
            sx={{
                padding: '10px'
            }}>
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                    marginBottom: '12px'
                }}>
                <div>
                    <p style={{
                        fontSize: '21px',
                        margin: 0
                    }}>{count}
                        {isMoney &&                            
                            '€'                      
                        }
                    </p>
                </div>
                <p style={{
                    fontSize: '12px'
                }}>{description}</p>
            </Stack>
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Button variant="outlined" onClick={() => setCount(count + amount)}>
                    <AddIcon></AddIcon>
                </Button>
                <Button variant="outlined" onClick={() => setCount(count - amount)}>
                    <RemoveIcon></RemoveIcon>
                </Button>
            </Stack>
        </Paper>
    )
}