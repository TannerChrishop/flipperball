//UIButton
// eslint-disable-next-line no-unused-vars
function UIButton(title, x, y, height, padding = 2, onClick) {
    const bounds = {};
    this.title = title;
    
    this.onClick = onClick;

    const setBounds = function(title, x, y, height, padding) {
        bounds.width = getTextWidth(title, Fonts.ButtonTitle) + padding * 2;
        bounds.height = height;
        
        bounds.x = x;
        bounds.y = y;
    }

    setBounds(this.title, x, y, height, padding);

    this.getBounds = function() {
        return bounds;
    }

    this.updateXPosition = function(newX) {
        bounds.x = newX;
    }

    this.updateYPosition = function(newY) {
        bounds.y = newY;
    }

    const didHit = function(pointerX, pointerY) {
        if(pointInside(pointerX, pointerY, bounds.x, bounds.y, bounds.width, bounds.height)) {
            return true;
        } else {
            return false;
        }
    }

    this.respondIfClicked = function(pointerX, pointerY) {
        if(didHit(pointerX, pointerY)) {
            this.onClick();
            return true;
        } else {
            return false;
        }
    }

    this.draw = function() {
        fontRenderer.drawString(canvasContext, x, y, title, GAME_SCALE);
        
        if(DEBUG) { // draw bounds for buttons in semi-transparent colors
            const BGColor = Color.Aqua;
            
            const tempAlpha = canvasContext.globalAlpha;
            canvasContext.globalAlpha = 0.2;
            
            drawRect(bounds.x, bounds.y, bounds.width, bounds.height, BGColor);
            
            canvasContext.globalAlpha = tempAlpha;
        }
    }
}