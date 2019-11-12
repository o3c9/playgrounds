#ifndef SHAPE_H_INCLUDED
#define SHAPE_H_INCLUDED

typedef enum {
    FALSE = 0,
    TRUE = 1
} Boolean;

typedef struct {
    int red;
    int green;
    int blue;
} Color;

typedef enum {
    FILL_NONE,                  /* 塗り潰さない */
    FILL_SOLID                  /* べた塗り */
} FillPattern;

typedef enum {
    POLYLINE_PRIMITIVE,
    RECTANGLE_PRIMITIVE,
    ELLIPSE_PRIMITIVE
} PrimitiveType;

typedef struct {
    double      x;
    double      y;
} Point;

typedef struct {
    int         npoints;
    Point       *point;
} Polyline;

typedef struct {
    Point       min_point;       /* 左下の座標 */
    Point       max_point;       /* 右上の座標 */
} Rectangle;

typedef struct {
    Point       center;         /* 中心 */
    double 	h_radius; /* 横方向の半径*/
    double 	v_radius; /* 縦方向の半径*/
} Ellipse;

typedef struct {
    /* 図形の種類 */
    PrimitiveType   type;
    /* ペン(輪郭)の色*/
    Color       line_color;
    /* 塗り潰しパターン。FILL_NONEの時には塗り潰さない */
    FillPattern fill_pattern;
    /* 塗り潰す時の色 */
    Color       fill_color;
    union {
        Polyline        polyline;
        Rectangle       rectangle;
        Ellipse         ellipse;
    } u;
} Primitive;

typedef struct Shape_tag Shape;

typedef struct {
    Shape   *head;
    Shape   *tail;
} Group;

typedef enum {
    PRIMITIVE_SHAPE,
    GROUP_SHAPE
} ShapeType;

struct Shape_tag {
    ShapeType           type;
    Boolean		selected;
    union {
        Primitive       primitive;
        Group           group;
    } u;
    struct Shape_tag *prev;
    struct Shape_tag *next;
};

#endif /* SHAPE_H_INCLUDED */
