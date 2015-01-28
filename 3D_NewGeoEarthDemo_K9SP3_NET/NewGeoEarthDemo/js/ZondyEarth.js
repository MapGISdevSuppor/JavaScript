zondy =
{
	setOnLoadCallback: function (initFunc)
 	{
 		window.onload = initFunc;
 	} 	
}

zondy.earth = 
{
	 	earthId: 'WebSceneDisCtrl',
	 	classId: 'clsid:5DC4A84D-3B7B-43BF-9765-42534899F7FA',
		codebaseValue: 'earth.exe',
	 	earthVersion: '65536',
	 	earthExtentX: '1323',
	 	earthExtentY: '1323',
	 	earthStockProps: '0',
	 	earthTreePath: 'http://127.0.0.1:8081/dcs/rest/dws/tddata?method=tree&classpath=G3DMdlPrj',
	 	
		createInstanse: function (containerId, initCallback, failureCallback)
		{	
			var container = document.getElementById(containerId);
			if(container == undefined)
			{
				failureCallback();
			}
		
		  var paramVersion = document.createElement('param');
		  paramVersion.setAttribute('name', '_Version');
		  paramVersion.setAttribute('value', this.earthVersion);
		  var paramExtentX = document.createElement('param');
		  paramExtentX.setAttribute('name', '_ExtentX');
		  paramExtentX.setAttribute('value', this.earthExtentX);
		  var paramExtentY = document.createElement('param');
		  paramExtentY.setAttribute('name', '_ExtentY');
		  paramExtentY.setAttribute('value', this.earthExtentY);
		  var paramStockProps = document.createElement('param');
		  paramStockProps.setAttribute('name', '_StockProps');
		  paramStockProps.setAttribute('value', this.earthStockProps);
		  var treePath = document.createElement('param');
		  treePath.setAttribute('name', 'TreePath');
		  treePath.setAttribute('value', this.earthTreePath);
 		  var earthObject = document.createElement('object');
		  earthObject.setAttribute('codebase', this.codebaseValue);
		  earthObject.setAttribute('id', this.earthId);
		  
		  earthObject.appendChild(paramVersion);
		  earthObject.appendChild(paramExtentX);
		  earthObject.appendChild(paramExtentY);
		  earthObject.appendChild(paramStockProps);
		  earthObject.appendChild(treePath);
		  container.appendChild(earthObject);
		  earthObject.setAttribute('classid', this.classId);
			
			earthObject.style.width = container.style.width;
			earthObject.style.height = container.style.height;
	
			initCallback(earthObject); 
		}
}

zondy.earth.eventListener = 
{
	addPointSelectEventListener: function (target, eventHandler)
	{
		if(target.attachEvent)
		{
			target.attachEvent('PointSelectEvent', eventHandler);
		}
		else if(target.addEventListener)
		{
			target.addEventListener('PointSelectEvent', eventHandler);
		}
		else
		{
			target['PolygonSelectEvent']= eventHandler;
		}
	},
	
	addRectangleSelectEventListener: function (target, eventHandler)
	{
		if(target.attachEvent)
		{
			target.attachEvent('RectangleSelectEvent', eventHandler);
		}
		else if(target.addEventListener)
		{
			target.addEventListener('RectangleSelectEvent', eventHandler);
		}
		else
		{
			target['RectangleSelectEvent'] = eventHandler;
		}
	},
	
	addPolygonSelectEventListener: function (target, eventHandler)
	{
		if(target.attachEvent)
		{
			target.attachEvent('PolygonSelectEvent', eventHandler);
		}
		else if(target.addEventListener)
		{
			target.addEventListener('PolygonSelectEvent', eventHandler);
		}
		else
		{
			target['PolygonSelectEvent'] = eventHandler;
		}
	},
	
	addEllipseSelectEventListener: function (target, eventHandler)
	{
		if(target.attachEvent)
		{
			target.attachEvent('EllipseSelectEvent', eventHandler);
		}
		else if(target.addEventListener)
		{
			target.addEventListener('EllipseSelectEvent', eventHandler);
		}
		else
		{
			target['EllipseSelectEvent'] = eventHandler;
		}
	},
	
	addCircleSelectEventListener: function (target, eventHandler)
	{
		if(target.attachEvent)
		{
			target.attachEvent('CircleSelectEvent', eventHandler);
		}
		else if(target.addEventListener)
		{
			target.addEventListener('CircleSelectEvent', eventHandler);
		}
		else
		{
			target['CircleSelectEvent'] = eventHandler;
		}
	},
	
	removePointSelectEventListener: function (target, eventHandler)
	{
		if(target.detachEvent)
		{
			target.detachEvent('PointSelectEvent', eventHandler);
		}
		else if(target.removeEventListener)
		{
			target.removeEventListener('PointSelectEvent');
		}
		else
		{
			target['PointSelectEvent'] = null;
		}
	},
		
	removeRectangleSelectEventListener: function (target, eventHandler)
	{
		if(target.detachEvent)
		{
			target.detachEvent('RectangleSelectEvent', eventHandler);
		}
		else if(target.removeEventListener)
		{
			target.removeEventListener('RectangleSelectEvent');
		}
		else
		{
			target['RectangleSelectEvent'] = null;
		}
	},	
	
	removePolygonSelectEventListener: function (target, eventHandler)
	{
		if(target.detachEvent)
		{
			target.detachEvent('PolygonSelectEvent', eventHandler);
		}
		else if(target.removeEventListener)
		{
			target.removeEventListener('PolygonSelectEvent');
		}
		else
		{
			target['PolygonSelectEvent'] = null;
		}
	},
	
	removeEllipseSelectEventListener: function (target, eventHandler)
	{
		if(target.detachEvent)
		{
			target.detachEvent('EllipseSelectEvent', eventHandler);
		}
		else if(target.removeEventListener)
		{
			target.removeEventListener('EllipseSelectEvent');
		}
		else
		{
			target['EllipseSelectEvent'] = null;
		}
	},
	
	removeCircleSelectEventListener: function (target, eventHandler)
	{
		if(target.detachEvent)
		{
			target.detachEvent('CircleSelectEvent', eventHandler);
		}
		else if(target.removeEventListener)
		{
			target.removeEventListener('CircleSelectEvent');
		}
		else
		{
			target['CircleSelectEvent'] = null;
		}
	}
}