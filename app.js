document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.cloud-node');
    const centralNode = document.querySelector('.central-node');
    const infoButton = document.querySelector('.info-button');
    const svg = document.getElementById('line-svg');
  
    nodes.forEach(node => {
      node.addEventListener('mousedown', startDragging);
      node.addEventListener('mouseup', stopDragging);
      node.addEventListener('mouseleave', stopDragging);
      node.addEventListener('mousemove', dragNode);
    });
  
    infoButton.addEventListener('mouseover', showAllInfo);
    infoButton.addEventListener('mouseout', hideAllInfo);
  
    let isDragging = false;
    let node;
    let initialX, initialY, offsetX, offsetY;
    let lines = [];
  
    function startDragging(e) {
      isDragging = true;
      node = e.target;
      initialX = e.clientX;
      initialY = e.clientY;
      offsetX = node.offsetLeft;
      offsetY = node.offsetTop;
      node.style.transition = '';
      svg.innerHTML = '';
      drawLines();
    }
  
    function dragNode(e) {
      if (!isDragging) return;
      const dx = e.clientX - initialX;
      const dy = e.clientY - initialY;
      const newX = offsetX + dx;
      const newY = offsetY + dy;
      node.style.left = newX + 'px';
      node.style.top = newY + 'px';
      drawLines(newX + node.offsetWidth / 2, newY + node.offsetHeight / 2);
    }
  
    function stopDragging() {
      isDragging = false;
      node.style.transition = '0.3s';
      setTimeout(() => drawLines(), 300);
    }
  
    function drawLines(x, y) {
      const centralNodeRect = centralNode.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      const centralX = centralNodeRect.left - svgRect.left + centralNode.offsetWidth / 2;
      const centralY = centralNodeRect.top - svgRect.top + centralNode.offsetHeight / 2;
  
      svg.innerHTML = '';
  
      lines.forEach(line => {
        svg.appendChild(line);
      });
  
      if (!x || !y) return;
  
      lines = [];
  
      nodes.forEach(targetNode => {
        if (targetNode !== node) {
          const targetRect = targetNode.getBoundingClientRect();
          const targetX = targetRect.left - svgRect.left + targetNode.offsetWidth / 2;
          const targetY = targetRect.top - svgRect.top + targetNode.offsetHeight / 2;
  
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', centralX);
          line.setAttribute('y1', centralY);
          line.setAttribute('x2', targetX);
          line.setAttribute('y2', targetY);
          line.setAttribute('stroke', '#fff');
          line.setAttribute('stroke-width', '2');
          lines.push(line);
        }
      });
    }
  
    function showAllInfo() {
      nodes.forEach(node => {
        showInfo(node);
      });
    }
  
    function hideAllInfo() {
      nodes.forEach(node => {
        hideInfo(node);
      });
    }
  
    function showInfo(node) {
      const text = node.getAttribute('data-text');
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info-div');
      infoDiv.innerHTML = `<p>${text}</p>`;
      document.body.appendChild(infoDiv);
      gsap.to(infoDiv, { duration: 0.3, opacity: 1 });
    }
  
    function hideInfo(node) {
      const infoDiv = document.querySelector('.info-div');
      if (infoDiv) {
        gsap.to(infoDiv, {
          duration: 0.3,
          opacity: 0,
          onComplete: () => {
            infoDiv.remove();
          },
        });
      }
    }
  });
  

  
  