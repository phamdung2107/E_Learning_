export const convertCategoriesToTreeData: any = (categoriesObj: any) => {
    const categories = Array.isArray(categoriesObj)
        ? categoriesObj
        : Object.values(categoriesObj)

    return categories.map((cat: any) => ({
        ...cat,
        title: cat.name,
        value: cat.id,
        key: cat.id,
        children: cat.children
            ? convertCategoriesToTreeData(cat.children)
            : null,
    }))
}
