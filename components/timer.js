import Paper from '@mui/material/Paper';
import Stack from '@mui/system/Stack';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useEffect, useState } from 'react';

export default function Timer() {

    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState(0)
    const [startingTime, setStartingTime] = useState(null)

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    const handleStartAndStop = () => {
        if (startingTime === null) {
           setStartingDateTime();
        }
        setIsRunning(!isRunning);
    }

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setStartingTime(null);
    }

    const setStartingDateTime= () => {
        var today = new Date();
        var curentTime = ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2);
        setStartingTime(curentTime);
    }

    return (
        <Paper sx={{
            padding: '10px'
        }}>
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    fontSize: '21px',
                }}>
                <span>
                    {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                </span>
                <span>
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>
                <span>
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
                </span>
                <span>
                    {("0" + ((time / 10) % 100)).slice(-2)}
                </span>
            </Stack>
            {startingTime !== null &&
                <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{                        
                        marginBottom: '10px', 
                        fontSize: '11px'
                    }}>
                    <span style={{color: '#1976d2'}}>START:</span>
                    <span style={{marginLeft: '3px'}}>{startingTime}</span>
                    <span style={{marginLeft: '4px', color: '#1976d2'}}>UHR</span>
                </Stack>
            }
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}>
                <Button variant='outlined' onClick={handleStartAndStop}>
                    {isRunning ? <PauseIcon></PauseIcon> : <PlayArrowIcon></PlayArrowIcon>}
                </Button>
                <Button variant='outlined' onClick={handleReset}>
                    <RestartAltIcon></RestartAltIcon>
                </Button>
            </Stack>
        </Paper>
    )
}