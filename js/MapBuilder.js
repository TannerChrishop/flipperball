// MapBuilder.js
// eslint-disable-next-line no-unused-vars
function MapBuilder (tableName = TABLES.Prototype) {
    const mapData = TileMaps[tableName];
    // eslint-disable-next-line consistent-this
    const self = this;
    this.collisionLayerData = null;
    this.dynamicLayerData = null;
    this.fixedLayerData = null;
    this.balls = [];
    this.flippers = [];
    this.animations = [];

    for (const layerData of mapData.layers) {
        switch(layerData.name) {
            case TABLE_LAYERS.Collision:
                this.collisionLayerData = layerData;
                break;
            case TABLE_LAYERS.Dynamic:
                this.dynamicLayerData = layerData;
                break;
            case TABLE_LAYERS.Fixed:
                this.fixedLayerData = layerData;
                break;
            default:
                // eslint-disable-next-line no-console
                console.error("Unknown Layer name encountered");
                break;
        }
    }

    const buildStaticObjects = function(objData) {
        const result = [];

        for (const obj of objData) {
            result.push(new StaticMapObject(obj));
        }
        return result;
    }

    const buildDynamicObjects = function(objData, collisionData) {
        const result = [];

        for (const obj of objData) {
            const bodyData = collisionData.find((data) => data.name === obj.name);
            if (obj.type === 'ball') {
                self.balls.push(new Ball(obj, bodyData));
            } else if ((obj.type === 'left_flipper') || (obj.type === 'right_flipper')) {
                self.flippers.push(new Flipper(obj, bodyData));
            } else if (obj.type === 'trigger') {
                result.push(new TriggerMapObject(obj, bodyData));
            } 
            else {
                result.push(new DynamicMapObject(obj, bodyData));
            }
        }

        return result;
    }

    const buildTableColliders = function (collisionData) {
        const result = [];

        for (const obj of collisionData) {
            if (obj.type === 'wall') {
                result.push(new TableObject(obj));
            }
        }

        return result;
    }

    this.staticObjects = buildStaticObjects(this.fixedLayerData.objects);
    this.dynamicObjects = buildDynamicObjects(this.dynamicLayerData.objects, this.collisionLayerData.objects);
    this.tableColliders = buildTableColliders(this.collisionLayerData.objects);
}

function StaticMapObject (objData) {
    this.x = objData.x;
    this.y = objData.y - objData.height;
    this.width = objData.width;
    this.height = objData.height;
    this.type = objData.type;
    this.reflectance = objData.reflectance || 0.75;
    this.image = images[objData.name];

    this.draw = function() {
        canvasContext.drawImage(this.image, this.x, this.y);
    }
}

function DynamicMapObject (objData, bodyData) {
    this.x = objData.x;
    this.y = objData.y - objData.height;
    this.width = objData.width;
    this.height = objData.height;
    
    this.type = objData.type;
    this.image = images[objData.name];
    this.body = new CollisionBody(bodyData);
    this.reflectance = objData.reflectance || 1;
    this.score = objData.properties ? objData.properties[0].value: 0;

    this.update = function(deltaTime) {}
    this.draw = function() {
        canvasContext.drawImage(this.image, this.x, this.y);
        this.body.draw();
    }
}

function TableObject (objData) {
    this.x = objData.x;
    this.y = objData.y - objData.height;
    this.width = objData.width;
    this.height = objData.height;
    this.type = objData.type;
    this.reflectance = objData.reflectance || 0.4;
    this.body = new CollisionBody(objData);
    this.draw = function() {
        this.body.draw();
    }
}

function TriggerMapObject(objData, bodyData) {
    this.x = objData.x;
    this.y = objData.y - objData.height;
    this.width = objData.width;
    this.height = objData.height;
    
    this.type = objData.type;
    this.image = images[objData.name];
    this.subType = objData.name;
    this.body = new CollisionBody(bodyData);
    this.reflectance = objData.reflectance || 1;
    this.hasCollided = false;
    this.score = objData.properties[0].value || 0;

    this.update = function(deltaTime) {}
    this.draw = function() {
        canvasContext.drawImage(this.image, this.x, this.y);
        this.body.draw();
    }
}