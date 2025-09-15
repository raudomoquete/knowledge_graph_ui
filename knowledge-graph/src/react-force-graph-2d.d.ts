declare module 'react-force-graph-2d' {
  import { Component } from 'react';

  interface ForceGraphProps {
    graphData: {
      nodes: any[];
      links: any[];
    };
    nodeLabel?: string;
    linkDirectionalArrowLength?: number;
    linkDirectionalArrowRelPos?: number;
    linkCurvature?: number;
  }

  export default class ForceGraph2D extends Component<ForceGraphProps> {}
}
