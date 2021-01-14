    //初始化
    d3.json("data.json").then(function (data) {
    const config = {
        textColor: 'black',
        title: '基础桑基图'
    }
    const sankey = d3.sankey()
        .nodeWidth(50)
        .nodePadding(30)
        .size([550, 350])
        .nodeId((d) => d.id);
    const { nodes, links } = sankey({
        nodes: data.nodes,
        links: data.links
    });
    var svg = d3.select("body").append('svg')
        .attr('width', 700)
        .attr('height', 600);
    svg.append('defs')//defs--被引用元素的容器
        .append('clipPath')//定义一条剪切路径，可作为其他元素的 clip-path 属性的值。剪切路径限制了图形的可见范围。从概念上来说，如果图形超出了当前剪切路径所包围的区域，那么超出部分将不会绘制。
        .attr('id', 'clip')
        .append('rect')
        .attr('width', 700)
        .attr('height', 600)
        .attr('x', 300)
        .attr('y', 300);
    svg.append('g')
        .attr('class', 'body')
        .attr('transform', 'translate(100,100)')
        .attr('clip-path', "url(#clip)");

    //节点
    const rects = svg.append('g')
        .attr('class', 'rects')
        .selectAll('.node')
        .data(nodes);
    rects.enter()
        .append('g')
        .attr('class', 'node')
        .attr('index', (d) => d.id)
        .attr('linkNodes', (d) => {
            const nextNodes = d.sourceLinks.map((link) => link.target.id).join('');
            const prevNodes = d.targetLinks.map((link) => link.source.id).join('');
            return nextNodes + d.id + prevNodes;
        })
        .append('rect')
        .merge(rects)
        .attr('x', (d) => d.x0)
        .attr('y', (d) => d.y0)
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .attr('fill', "blue");
    rects.exit()
        .remove();

    //连线
    const lines = svg.append('g')
        .attr('class', 'lines')
        .selectAll('path')
        .data(links);
    lines.enter()
        .append('path')
        .merge(lines)
        .attr('linkNodes', (d) => d.source.id + '-' + d.target.id)
        .attr('d', d3.sankeyLinkHorizontal())
        .attr('stroke', "blue")
        .attr('stroke-width', (d) => d.width)
        .attr('stroke-opacity', '0.4')
        .attr('fill', 'none')
        //鼠标事件
        .on("mouseover",function(d,i){
            d3.select(this).style("stroke","yellow");
        })
        .on("mouseout",function(d,i){
            d3.select(this)
                .transition()
                .duration(1000)
                .style("stroke","blue");
        });		
    lines.exit()
        .remove();

    //文本
    d3.selectAll('.text').remove();
    svg.selectAll('.node')
        .append('text')
        .attr('class', 'text')
        .attr('x', (d) => (d.x0 + d.x1) / 2)
        .attr('y', (d) => (d.y0 + d.y1) / 2)
        .attr('stroke', config.textColor)
        .attr('text-anchor', 'middle')
        .attr('dy', 6)
        .text((d) => d.id);

    //标题
    svg.append('text')
        .classed('title', true)
        .attr('x', 200)
        .attr('y', 0)
        .attr('dy', '2em')
        .text(config.title)
        .attr('fill', config.textColor)
        .attr('text-anchor', 'middle')
        .attr('stroke', config.textColor);

});
