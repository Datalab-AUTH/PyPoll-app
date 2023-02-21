import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Graph from 'graphology';
import { parse } from 'graphology-gexf/browser';
import Sigma from 'sigma';
import EdgesDefaultProgram from 'sigma/rendering/webgl/programs/edge';
import EdgesFastProgram from 'sigma/rendering/webgl/programs/edge.fast';
import axios from 'axios';
import './Embed.css';
import { Button, ButtonGroup } from '@mui/material';
import { InfoOutlined, SettingsBackupRestore, ZoomIn, ZoomOut } from '@mui/icons-material';

import Information from './Information';

const URL = process.env.REACT_APP_API_HOST;

function Embed() {
    const { id } = useParams();
    const sigma = useRef(null);
    const container = useRef(null);
    const [metadata, setMetadata] = useState({});
    const [openInformation, setOpenInformation] = useState(false);

    const setSigma = async (graph_id) => {
        const { data } = await axios.get(`${URL}/graph/get/${graph_id}`);
        setMetadata(data.metadata);
        return new Sigma(parse(Graph, data.data), container.current, {
            minCameraRatio: 0.1,
            maxCameraRatio: 1,
            defaultEdgeType: 'edges-fast',
            edgeProgramClasses: {
                'edges-default': EdgesDefaultProgram,
                'edges-fast': EdgesFastProgram
            },
            hideEdgesOnMove: false,
            hideLabelsOnMove: true,
            renderLabels: false
        });
    };

    useEffect(() => {
        setSigma(id)
            .then((res) => {
                sigma.current = res;
            });
        return () => {
            sigma.current?.kill();
        };
    }, [id]);

    return (
        <div className="container">
            <div ref={container} className="sigma">
                <ButtonGroup className="controls">
                    <Button
                        onClick={() => {
                            sigma.current?.getCamera().animatedZoom({duration: 600});
                        }}
                    >
                        <ZoomIn />
                    </Button>
                    <Button
                        onClick={() => {
                            sigma.current?.getCamera().animatedUnzoom({duration: 600});
                        }}
                    >
                        <ZoomOut />
                    </Button>
                    <Button
                        onClick={() => {
                            sigma.current?.getCamera().animatedReset({duration: 600});
                        }}
                    >
                        <SettingsBackupRestore />
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenInformation(true);
                        }}
                    >
                        <InfoOutlined />
                    </Button>
                </ButtonGroup>
            </div>
            <Information control={{openInformation, setOpenInformation}} data={metadata} />
        </div>
    );
}

export default Embed;
