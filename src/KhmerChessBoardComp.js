"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var khmer_chess_ai_1 = require("khmer-chess-ai");
var khmer_chess_board_1 = require("khmer-chess-board");
var khmer_chess_1 = require("khmer-chess");
var KhmerChessBoardComp = /** @class */ (function (_super) {
    __extends(KhmerChessBoardComp, _super);
    function KhmerChessBoardComp(props) {
        var _this = _super.call(this, props) || this;
        _this.khmerChessBoard = null;
        _this.myRef = react_1["default"].createRef();
        return _this;
    }
    KhmerChessBoardComp.prototype.componentDidMount = function () {
        var container = this.myRef.current;
        this.khmerChessBoard = new khmer_chess_board_1.KhmerChessBoard();
        var kcb = this.khmerChessBoard;
        kcb.setOptions({
            width: this.props.width,
            container: container
        });
        kcb.soundManager.enable();
        var khmerChessAI = new khmer_chess_ai_1.KhmerChessAI({
            khmerChess: kcb.khmerChess,
            turn: khmer_chess_1.PIECE_COLOR_BLACK
        });
        kcb.boardManager.addBoardStatusEventListener(function (boardStatusEvent) {
            console.log(boardStatusEvent.message);
            if (boardStatusEvent.isWin) {
                alert(boardStatusEvent.message);
            }
            else if (boardStatusEvent.isMoving && khmerChessAI.isAITurn) {
                var result = khmerChessAI.attemptMove();
                if (result) {
                    kcb.move(result.fromIndex, result.toIndex);
                }
                else {
                    alert('Fail to attempt move');
                }
            }
        });
        kcb.playManager.play();
    };
    KhmerChessBoardComp.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.khmerChessBoard) === null || _a === void 0 ? void 0 : _a.destroy();
        this.khmerChessBoard = null;
    };
    KhmerChessBoardComp.prototype.render = function () {
        return (<div className="container" ref={this.myRef}></div>);
    };
    return KhmerChessBoardComp;
}(react_1["default"].Component));
exports["default"] = KhmerChessBoardComp;
